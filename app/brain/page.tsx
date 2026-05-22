"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import topicData from "@/data/topics.json";
import DiscordGate from "@/app/components/DiscordGate";

interface Topic {
  id: string;
  name: string;
  short: string;
  url?: string;
}

interface Category {
  id: string;
  name: string;
  topics: Topic[];
}

interface Relation {
  source: string;
  target: string;
  type: string;
}

const CATEGORY_COLORS: Record<string, { border: string; text: string; bg: string }> = {
  foundations: { border: "#8052ff", text: "#c4b5fd", bg: "rgba(128, 82, 255, 0.15)" },
  macro: { border: "#06b6d4", text: "#a5f3fc", bg: "rgba(6, 182, 212, 0.15)" },
  options: { border: "#f59e0b", text: "#fde68a", bg: "rgba(245, 158, 11, 0.15)" },
  orderflow: { border: "#10b981", text: "#a7f3d0", bg: "rgba(16, 185, 129, 0.15)" },
  "trading-strategy": { border: "#ef4444", text: "#fecaca", bg: "rgba(239, 68, 68, 0.15)" },
  quant: { border: "#8b5cf6", text: "#ddd6fe", bg: "rgba(139, 92, 246, 0.15)" },
  risk: { border: "#ec4899", text: "#fbcfe8", bg: "rgba(236, 72, 153, 0.15)" },
  participants: { border: "#6366f1", text: "#c7d2fe", bg: "rgba(99, 102, 241, 0.15)" },
};

interface GraphNode {
  id: string;
  name: string;
  short: string;
  level: "main" | "sub";
  category: string;
  url?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

function generateGraphData(data: typeof topicData) {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  data.categories.forEach((cat: Category) => {
    nodes.push({
      id: cat.id,
      name: cat.name,
      short: cat.name.toUpperCase(),
      level: "main",
      category: cat.id,
      url: `/education/${cat.id}`,
    });

    cat.topics.forEach((topic: Topic) => {
      nodes.push({
        id: topic.id,
        name: topic.name,
        short: topic.short,
        level: "sub",
        category: cat.id,
        url: topic.url,
      });

      links.push({
        source: cat.id,
        target: topic.id,
      });
    });
  });

  data.relations.forEach((rel: Relation) => {
    links.push({
      source: rel.source,
      target: rel.target,
    });
  });

  return { nodes, links };
}

export default function BrainPage() {
  return (
    <DiscordGate>
      <Brain />
    </DiscordGate>
  );
}

function Brain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animFrameRef = useRef<number>(0);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const dragNodeRef = useRef<GraphNode | null>(null);
  const zoomRef = useRef({ x: 0, y: 0, k: 1 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const panOffsetStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const graphData = useMemo(() => generateGraphData(topicData), []);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const centerX = canvas.width / (2 * window.devicePixelRatio);
    const centerY = canvas.height / (2 * window.devicePixelRatio);
    
    const totalCategories = graphData.nodes.filter(node => node.level === "main").length || 8;
    nodesRef.current = graphData.nodes.map((n, i) => {
      const categoryIndex = graphData.nodes.filter(node => node.level === "main").findIndex(node => node.id === n.category);
      const angle = (categoryIndex / totalCategories) * 2 * Math.PI + (i % 3) * 0.5;
      const radius = n.level === "main" ? 95 : 155 + (i % 4) * 35;
      
      return {
        ...n,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 50,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 50,
        vx: 0,
        vy: 0,
      };
    });
    
    linksRef.current = graphData.links;

    const nodeMap = new Map<string, GraphNode>();
    nodesRef.current.forEach((n) => nodeMap.set(n.id, n));

    let tick = 0;
    const maxTicks = 400;

    const simulate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const nodes = nodesRef.current;
      const links = linksRef.current;

      if (tick < maxTicks) {
        const alpha = Math.max(0.01, 1 - tick / maxTicks);

        const chargeStrength = -700;
        for (let i = 0; i < nodes.length; i++) {
          const nodeA = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];
            if (nodeA.x === undefined || nodeA.y === undefined || nodeB.x === undefined || nodeB.y === undefined) continue;

            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq) || 1;

            const force = (chargeStrength / distSq) * alpha;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (dragNodeRef.current?.id !== nodeA.id) {
              nodeA.vx = (nodeA.vx || 0) + fx;
              nodeA.vy = (nodeA.vy || 0) + fy;
            }
            if (dragNodeRef.current?.id !== nodeB.id) {
              nodeB.vx = (nodeB.vx || 0) - fx;
              nodeB.vy = (nodeB.vy || 0) - fy;
            }
          }
        }

        const linkStrength = 0.05;
        const desiredDistance = 110;
        links.forEach((link) => {
          const source = nodeMap.get(link.source);
          const target = nodeMap.get(link.target);
          if (!source || !target || source.x === undefined || source.y === undefined || target.x === undefined || target.y === undefined) return;

          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const force = (dist - desiredDistance) * linkStrength * alpha;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (dragNodeRef.current?.id !== source.id) {
            source.vx = (source.vx || 0) + fx;
            source.vy = (source.vy || 0) + fy;
          }
          if (dragNodeRef.current?.id !== target.id) {
            target.vx = (target.vx || 0) - fx;
            target.vy = (target.vy || 0) - fy;
          }
        });

        for (let i = 0; i < nodes.length; i++) {
          const nodeA = nodes[i];
          if (nodeA.x === undefined || nodeA.y === undefined) continue;
          const rA = nodeA.level === "main" ? 38 : 22;
          for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];
            if (nodeB.x === undefined || nodeB.y === undefined) continue;
            const rB = nodeB.level === "main" ? 38 : 22;
            const minDistance = rA + rB;

            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            if (dist < minDistance) {
              const overlap = minDistance - dist;
              const pushX = (dx / dist) * overlap * 0.5 * alpha;
              const pushY = (dy / dist) * overlap * 0.5 * alpha;

              if (dragNodeRef.current?.id !== nodeA.id) {
                nodeA.x -= pushX;
                nodeA.y -= pushY;
              }
              if (dragNodeRef.current?.id !== nodeB.id) {
                nodeB.x += pushX;
                nodeB.y += pushY;
              }
            }
          }
        }

        const gravity = 0.015;
        nodes.forEach((node) => {
          if (node.x === undefined || node.y === undefined || dragNodeRef.current?.id === node.id) return;
          node.vx = (node.vx || 0) + (centerX - node.x) * gravity * alpha;
          node.vy = (node.vy || 0) + (centerY - node.y) * gravity * alpha;
        });

        const friction = 0.84;
        nodes.forEach((node) => {
          if (node.x === undefined || node.y === undefined || dragNodeRef.current?.id === node.id) return;
          node.vx = (node.vx || 0) * friction;
          node.vy = (node.vy || 0) * friction;
          node.x += node.vx;
          node.y += node.vy;

          const margin = 40;
          node.x = Math.max(margin, Math.min(width - margin, node.x));
          node.y = Math.max(margin, Math.min(height - margin, node.y));
        });

        tick++;
      }

      ctx.clearRect(0, 0, width, height);

      const { x: zoomX, y: zoomY, k: zoomK } = zoomRef.current;

      ctx.save();
      ctx.translate(zoomX * zoomK, zoomY * zoomK);
      ctx.scale(zoomK, zoomK);

      links.forEach((link) => {
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (!source?.x || !source.y || !target?.x || !target.y) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        const isMainLink = source.level === "main" && target.level === "main";
        if (isMainLink) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1.0 / zoomK;
        } else {
          const colors = CATEGORY_COLORS[source.category] || CATEGORY_COLORS.foundations;
          ctx.strokeStyle = `${colors.border}1c`;
          ctx.lineWidth = 0.6 / zoomK;
        }
        ctx.stroke();
      });

      nodes.forEach((node) => {
        if (!node.x || !node.y) return;
        const colors = CATEGORY_COLORS[node.category] || CATEGORY_COLORS.foundations;
        const isMain = node.level === "main";
        
        const isHovered = hoveredNode?.id === node.id;
        const isRelated = hoveredNode && (
          hoveredNode.id === node.id ||
          links.some(l => (l.source === hoveredNode.id && l.target === node.id) || (l.source === node.id && l.target === hoveredNode.id))
        );

        const size = isMain ? 10 : 4.5;
        const scale = isHovered ? 1.4 : isRelated ? 1.2 : 1.0;
        const finalSize = size * scale;

        ctx.beginPath();
        ctx.arc(node.x, node.y, finalSize, 0, 2 * Math.PI);
        
        if (isMain || isHovered) {
          ctx.shadowColor = colors.border;
          ctx.shadowBlur = isHovered ? 15 : 6;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fillStyle = isHovered ? colors.border : colors.bg;
        ctx.fill();
        ctx.strokeStyle = colors.border;
        ctx.lineWidth = isMain ? 2 : 1;
        ctx.stroke();
        
        ctx.shadowBlur = 0;

        const label = node.short || node.name;
        const showLabel = isMain || zoomK > 1.15 || isRelated || isHovered;
        
        if (showLabel) {
          const fontSize = isMain ? 11 : 8.5;
          ctx.font = isMain 
            ? `bold ${fontSize}px var(--font-mono), monospace` 
            : `${fontSize}px var(--font-mono), monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          
          const textY = node.y - finalSize - 4;
          
          ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
          ctx.lineWidth = 3.5;
          ctx.strokeText(label, node.x, textY);
          
          ctx.fillStyle = isHovered 
            ? "#ffffff" 
            : isMain 
              ? colors.text 
              : "rgba(220, 220, 220, 0.85)";
          ctx.fillText(label, node.x, textY);
        }
      });

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(simulate);
    };

    animFrameRef.current = requestAnimationFrame(simulate);
    setIsLoaded(true);

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left - zoomRef.current.x * zoomRef.current.k) / zoomRef.current.k,
        y: (e.clientY - rect.top - zoomRef.current.y * zoomRef.current.k) / zoomRef.current.k,
      };
    };

    const findNodeAt = (mx: number, my: number) => {
      for (let i = nodesRef.current.length - 1; i >= 0; i--) {
        const node = nodesRef.current[i];
        if (!node.x || !node.y) continue;
        const size = node.level === "main" ? 12 : 5;
        const dx = mx - node.x;
        const dy = my - node.y;
        if (dx * dx + dy * dy < (size + 5) * (size + 5)) return node;
      }
      return null;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getMousePos(e);
      const node = findNodeAt(pos.x, pos.y);
      if (node) {
        dragNodeRef.current = node;
        mouseRef.current = pos;
        hasDraggedRef.current = false;
        canvas.style.cursor = "grabbing";
        tick = 0;
      } else {
        isPanningRef.current = true;
        panStartRef.current = { x: e.clientX, y: e.clientY };
        panOffsetStartRef.current = { x: zoomRef.current.x, y: zoomRef.current.y };
        hasDraggedRef.current = false;
        canvas.style.cursor = "grabbing";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e);
      if (dragNodeRef.current) {
        hasDraggedRef.current = true;
        const dx = pos.x - mouseRef.current.x;
        const dy = pos.y - mouseRef.current.y;
        dragNodeRef.current.x = (dragNodeRef.current.x || 0) + dx;
        dragNodeRef.current.y = (dragNodeRef.current.y || 0) + dy;
        dragNodeRef.current.vx = 0;
        dragNodeRef.current.vy = 0;
        mouseRef.current = pos;
        tick = 0;
      } else if (isPanningRef.current) {
        hasDraggedRef.current = true;
        const dx = (e.clientX - panStartRef.current.x) / zoomRef.current.k;
        const dy = (e.clientY - panStartRef.current.y) / zoomRef.current.k;
        zoomRef.current.x = panOffsetStartRef.current.x + dx;
        zoomRef.current.y = panOffsetStartRef.current.y + dy;
      } else {
        const node = findNodeAt(pos.x, pos.y);
        setHoveredNode(node);
        canvas.style.cursor = node ? "pointer" : "default";
      }
    };

    const handleMouseUp = () => {
      dragNodeRef.current = null;
      isPanningRef.current = false;
      canvas.style.cursor = "default";
    };

    const handleClick = (e: MouseEvent) => {
      if (hasDraggedRef.current) return;
      const pos = getMousePos(e);
      const node = findNodeAt(pos.x, pos.y);
      if (node) {
        if (node.url) {
          router.push(node.url);
        } else if (node.level === "main") {
          router.push(`/education/${node.id}`);
        } else {
          router.push(`/education/${node.category}/${node.id}`);
        }
      }
    };

    const getTouchPos = (e: TouchEvent) => {
      if (e.touches.length === 0) return null;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      return {
        x: (touch.clientX - rect.left - zoomRef.current.x * zoomRef.current.k) / zoomRef.current.k,
        y: (touch.clientY - rect.top - zoomRef.current.y * zoomRef.current.k) / zoomRef.current.k,
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      const pos = getTouchPos(e);
      if (!pos) return;
      
      const node = findNodeAt(pos.x, pos.y);
      if (node) {
        e.preventDefault();
        dragNodeRef.current = node;
        mouseRef.current = pos;
        hasDraggedRef.current = false;
        canvas.style.cursor = "grabbing";
        tick = 0;
      } else {
        isPanningRef.current = true;
        const touch = e.touches[0];
        panStartRef.current = { x: touch.clientX, y: touch.clientY };
        panOffsetStartRef.current = { x: zoomRef.current.x, y: zoomRef.current.y };
        hasDraggedRef.current = false;
        canvas.style.cursor = "grabbing";
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const pos = getTouchPos(e);
      if (!pos) return;

      if (dragNodeRef.current) {
        e.preventDefault();
        hasDraggedRef.current = true;
        const dx = pos.x - mouseRef.current.x;
        const dy = pos.y - mouseRef.current.y;
        dragNodeRef.current.x = (dragNodeRef.current.x || 0) + dx;
        dragNodeRef.current.y = (dragNodeRef.current.y || 0) + dy;
        dragNodeRef.current.vx = 0;
        dragNodeRef.current.vy = 0;
        mouseRef.current = pos;
        tick = 0;
      } else if (isPanningRef.current) {
        e.preventDefault();
        hasDraggedRef.current = true;
        const touch = e.touches[0];
        const dx = (touch.clientX - panStartRef.current.x) / zoomRef.current.k;
        const dy = (touch.clientY - panStartRef.current.y) / zoomRef.current.k;
        zoomRef.current.x = panOffsetStartRef.current.x + dx;
        zoomRef.current.y = panOffsetStartRef.current.y + dy;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!hasDraggedRef.current && dragNodeRef.current) {
        const node = dragNodeRef.current;
        if (node.url) {
          router.push(node.url);
        } else if (node.level === "main") {
          router.push(`/education/${node.id}`);
        } else {
          router.push(`/education/${node.category}/${node.id}`);
        }
      }
      dragNodeRef.current = null;
      isPanningRef.current = false;
      canvas.style.cursor = "default";
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const oldK = zoomRef.current.k;
      const newK = Math.max(0.3, Math.min(5, oldK * delta));

      zoomRef.current.x = zoomRef.current.x + mouseX / newK - mouseX / oldK;
      zoomRef.current.y = zoomRef.current.y + mouseY / newK - mouseY / oldK;
      zoomRef.current.k = newK;
      tick = 0;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [graphData, router]);

  return (
    <main className="min-h-screen" style={{ background: "var(--color-midnight-void)" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px" }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "24px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: "12px",
              color: "#8052ff",
            }}
          >
            02 — KNOWLEDGE GRAPH
          </span>
          <h1
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "32px",
              fontWeight: 700,
              color: "#F3F3F3",
              marginBottom: "8px",
            }}
          >
            THE BRAIN
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "14px",
              color: "#858585",
            }}
          >
            Click sub-nodes to open content · Drag nodes or canvas to explore · Scroll to zoom
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative"
          style={{
            height: "700px",
            background: "var(--color-deep-space)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
        >
          <canvas ref={canvasRef} className="w-full h-full" style={{ cursor: "default" }} />

          {error && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "var(--color-deep-space)" }}
            >
              <div className="text-center">
                <p style={{ color: "#ef4444", fontFamily: "var(--font-mono)", fontSize: "14px" }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {hoveredNode && !error && (
            <div
              className="absolute pointer-events-none z-50 px-4 py-2 rounded-lg"
              style={{
                left: "50%",
                top: "20px",
                transform: "translateX(-50%)",
                background: "rgba(8, 8, 8, 0.95)",
                border: `1px solid ${CATEGORY_COLORS[hoveredNode.category]?.border || "#8052ff"}`,
                boxShadow: `0 0 20px ${CATEGORY_COLORS[hoveredNode.category]?.border || "#8052ff"}40`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#F3F3F3",
                  whiteSpace: "nowrap",
                }}
              >
                {hoveredNode.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "#858585",
                  marginLeft: "8px",
                }}
              >
                {hoveredNode.level === "main" ? "CATEGORY" : "TOPIC"}
              </span>
            </div>
          )}

          <div
            className="absolute bottom-4 left-4 flex items-center gap-4 p-3 rounded-lg"
            style={{ background: "rgba(8,8,8,0.8)", backdropFilter: "blur(10px)" }}
          >
            {Object.entries(CATEGORY_COLORS).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: val.border,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "#858585",
                    textTransform: "capitalize",
                  }}
                >
                  {key}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div
              className="px-3 py-1.5 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "#858585",
              }}
            >
              SCROLL TO ZOOM
            </div>
            <div
              className="px-3 py-1.5 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "#858585",
              }}
            >
              DRAG NODES OR CANVAS
            </div>
          </div>

          {!isLoaded && !error && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "var(--color-deep-space)" }}
            >
              <div className="text-center">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    background: "rgba(128, 82, 255, 0.2)",
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "14px",
                    color: "#858585",
                  }}
                >
                  Initializing knowledge graph...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
      </main>
  );
}
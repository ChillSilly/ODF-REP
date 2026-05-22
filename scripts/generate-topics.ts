import fs from 'fs';
import path from 'path';
import {
  educationCategories,
  categoryLabels,
  lectures,
  topicsByCategory,
} from '../data/educationVault';

function getShortName(title: string): string {
  // Check if it matches L1 — Futures Market Structure
  const match = title.match(/^(L\d+)\s*—\s*(.+)$/i);
  if (match) {
    const num = match[1];
    const rest = match[2];
    const firstWord = rest.split(/\s+/)[0];
    // Clean firstWord from special chars
    const cleanWord = firstWord.replace(/[^a-zA-Z0-9]/g, '');
    return `${num} ${cleanWord}`;
  }
  // Otherwise, if title is too long, take the first 15 characters
  if (title.length > 15) {
    return title.slice(0, 12).trim() + "...";
  }
  return title;
}

function main() {
  console.log("Generating data/topics.json...");

  const categoriesData = educationCategories.map((catId) => {
    const catLabel = categoryLabels[catId];
    const catLectures = lectures.filter((l) => l.category === catId);
    const catTopics = topicsByCategory[catId] || [];

    // Compile topics for this category
    const topicsList: any[] = [];

    // 1. Add lectures
    catLectures.forEach((lec) => {
      topicsList.push({
        id: lec.id,
        name: lec.title,
        short: getShortName(lec.title),
        url: `/education/lectures/${lec.id}`,
      });
    });

    // 2. Add other topics
    catTopics.forEach((topic) => {
      // Don't add if it's already added as a lecture
      if (topicsList.some((t) => t.id === topic.id)) return;

      topicsList.push({
        id: topic.id,
        name: topic.title,
        short: getShortName(topic.title),
        url: `/education/${catId}/${topic.id}`,
      });
    });

    return {
      id: catId,
      name: catLabel,
      topics: topicsList,
    };
  });

  // Define relationships between category nodes to construct the graph backbone
  const relations = [
    { source: "foundations", target: "macro", type: "cross" },
    { source: "foundations", target: "options", type: "cross" },
    { source: "foundations", target: "orderflow", type: "cross" },
    { source: "macro", target: "trading-strategy", type: "cross" },
    { source: "options", target: "trading-strategy", type: "cross" },
    { source: "orderflow", target: "trading-strategy", type: "cross" },
    { source: "quant", target: "options", type: "cross" },
    { source: "quant", target: "trading-strategy", type: "cross" },
    { source: "risk", target: "trading-strategy", type: "cross" },
    { source: "participants", target: "macro", type: "cross" },
    { source: "participants", target: "orderflow", type: "cross" },
  ];

  const output = {
    categories: categoriesData,
    relations,
  };

  const outputPath = path.join(__dirname, '../data/topics.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`Successfully wrote ${categoriesData.reduce((acc, c) => acc + c.topics.length, 0)} nodes to ${outputPath}`);
}

main();

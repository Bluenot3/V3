import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const asset = (name) => join(root, "assets", name);
const pngDataUri = (name) =>
  `data:image/png;base64,${readFileSync(asset(name)).toString("base64")}`;

const logo = pngDataUri("zen-logo.png");
const previewA = pngDataUri("partner-preview-a.png");
const previewB = pngDataUri("partner-preview-b.png");

const esc = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const wrap = (text, maxChars) => {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
};

const textBlock = ({
  x,
  y,
  lines,
  size = 24,
  fill = "#f5f7fb",
  family = "Inter, Arial, sans-serif",
  weight = 500,
  lineHeight = 1.36,
  spacing = 0,
  anchor = "start",
  uppercase = false,
}) => {
  const step = Math.round(size * lineHeight);
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" text-anchor="${anchor}">${lines
    .map((line, index) => {
      const value = esc(uppercase ? line.toUpperCase() : line);
      return `<tspan x="${x}" dy="${index === 0 ? 0 : step}">${value}</tspan>`;
    })
    .join("")}</text>`;
};

const sectionPill = (x, y, label, width = 240) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="40" rx="20" fill="#0a2746" fill-opacity="0.9" stroke="#7fd7ff" stroke-opacity="0.2"/>
    <text x="${width / 2}" y="26" text-anchor="middle" fill="#72ebff" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="4">${esc(
      label.toUpperCase()
    )}</text>
  </g>
`;

const chip = (x, y, label, width) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="46" rx="23" fill="url(#chipBg)" stroke="#95d7ff" stroke-opacity="0.16"/>
    <text x="${width / 2}" y="30" text-anchor="middle" fill="#eef5ff" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700">${esc(label)}</text>
  </g>
`;

const statsCard = ({ x, y, value, label, body }) => `
  <g transform="translate(${x} ${y})">
    <rect width="332" height="148" rx="24" fill="url(#panelBg)" stroke="#95ccff" stroke-opacity="0.12"/>
    <text x="24" y="58" fill="#f5f7fb" font-family="Orbitron, Arial, sans-serif" font-size="40" font-weight="800">${esc(value)}</text>
    <text x="24" y="84" fill="#f6d690" font-family="Inter, Arial, sans-serif" font-size="12" font-weight="800" letter-spacing="4">${esc(
      label.toUpperCase()
    )}</text>
    ${textBlock({
      x: 24,
      y: 112,
      lines: wrap(body, 34),
      size: 15,
      fill: "#cfdcf0",
      lineHeight: 1.34,
    })}
  </g>
`;

const metaPill = ({ x, y, label, value, width, valueFill = "#eef5ff" }) => `
  <g transform="translate(${x} ${y})">
    <rect width="${width}" height="54" rx="18" fill="#081d33" stroke="#95ccff" stroke-opacity="0.12"/>
    <text x="18" y="20" fill="#72ebff" font-family="Inter, Arial, sans-serif" font-size="11" font-weight="800" letter-spacing="2">${esc(
      label.toUpperCase()
    )}</text>
    ${textBlock({
      x: 18,
      y: 40,
      lines: wrap(value, Math.max(12, Math.floor(width / 10))),
      size: 14,
      fill: valueFill,
      weight: 700,
      lineHeight: 1.1,
    })}
  </g>
`;

const programCard = ({
  x,
  y,
  accent,
  badge,
  name,
  audience,
  level,
  duration,
  spotlight,
  outcomes,
  modules,
}) => {
  const outcomeBullets = outcomes
    .map((item, index) => {
      const lines = wrap(item, 62);
      const baseY = 196 + index * 72;
      return `
        <circle cx="28" cy="${baseY - 6}" r="4" fill="${accent}" />
        ${textBlock({
          x: 44,
          y: baseY,
          lines,
          size: 16,
          fill: "#d6e1f2",
          lineHeight: 1.34,
        })}
      `;
    })
    .join("");

  const moduleRows = modules
    .map((module, index) => {
      const lines = wrap(module, 34);
      const baseY = 126 + index * 68;
      return `
        <text x="0" y="${baseY}" fill="${accent}" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2">${esc(
          `MODULE ${index + 1}`
        )}</text>
        ${textBlock({
          x: 0,
          y: baseY + 24,
          lines,
          size: 20,
          fill: "#f5f7fb",
          weight: 800,
          lineHeight: 1.18,
        })}
      `;
    })
    .join("");

  return `
  <g transform="translate(${x} ${y})">
    <rect width="1456" height="446" rx="30" fill="url(#panelBg)" stroke="#95ccff" stroke-opacity="0.12"/>
    <rect x="0" y="0" width="1456" height="446" rx="30" fill="${accent}" fill-opacity="0.045"/>
    <rect x="28" y="30" width="10" height="88" rx="5" fill="${accent}"/>
    ${badge ? `<rect x="1234" y="28" width="180" height="34" rx="17" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.24"/><text x="1324" y="50" text-anchor="middle" fill="${accent}" font-family="Inter, Arial, sans-serif" font-size="12" font-weight="800" letter-spacing="1.6">${esc(
      badge.toUpperCase()
    )}</text>` : ""}
    <text x="58" y="62" fill="#f5f7fb" font-family="Orbitron, Arial, sans-serif" font-size="34" font-weight="800">${esc(name)}</text>
    ${textBlock({
      x: 58,
      y: 98,
      lines: wrap(spotlight, 92),
      size: 18,
      fill: "#d9e5f6",
      lineHeight: 1.34,
    })}

    ${metaPill({ x: 58, y: 140, label: "Audience", value: audience, width: 250, valueFill: accent })}
    ${metaPill({ x: 326, y: 140, label: "Level", value: level, width: 230 })}
    ${metaPill({ x: 574, y: 140, label: "Duration", value: duration, width: 250 })}

    <text x="58" y="212" fill="#f6d690" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="4">WHAT THIS PROGRAM DELIVERS</text>
    <g transform="translate(58 0)">
      ${outcomeBullets}
    </g>

    <line x1="884" y1="92" x2="884" y2="390" stroke="#95ccff" stroke-opacity="0.12"/>
    <text x="928" y="122" fill="#72ebff" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="4">4-MODULE BREAKDOWN</text>
    <g transform="translate(928 0)">
      ${moduleRows}
    </g>
  </g>`;
};

const previewCard = ({ x, y, href, title, lines }) => `
  <g transform="translate(${x} ${y})">
    <rect width="702" height="366" rx="28" fill="url(#panelBg)" stroke="#95ccff" stroke-opacity="0.12"/>
    <rect x="20" y="20" width="662" height="230" rx="18" fill="#041221" stroke="#ffffff" stroke-opacity="0.06"/>
    <image href="${href}" x="20" y="20" width="662" height="230" preserveAspectRatio="xMidYMid meet"/>
    <text x="24" y="282" fill="#f6d690" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="3">${esc(
      title.toUpperCase()
    )}</text>
    ${textBlock({
      x: 24,
      y: 310,
      lines,
      size: 16,
      fill: "#d6e1f2",
      lineHeight: 1.36,
    })}
  </g>
`;

const programs = [
  {
    badge: "Flagship",
    accent: "#c18cff",
    name: "ZEN Vanguard",
    audience: "Adults, workforce learners, founders, operators",
    level: "Intermediate to advanced",
    duration: "4 modules, self-paced",
    spotlight: "Professional operator track for adults, career changers, and technical builders moving from AI user to production-minded deployer.",
    outcomes: [
      "Build a durable mental model of how modern AI systems work and where they fail.",
      "Design tool-using agents, automations, retrieval systems, and monitored workflows.",
      "Ship portfolio-grade projects with stronger governance, evaluation, and delivery discipline.",
    ],
    modules: [
      "The Intelligence Inside",
      "Agents and Automation Frameworks",
      "Personal Intelligence and Cognitive Systems",
      "AI Systems Mastery and Professional Integration",
    ],
  },
  {
    badge: "Best place to start",
    accent: "#67c8ff",
    name: "AI Pioneer Program",
    audience: "Ages 11-18, first-time builders, clubs, schools",
    level: "Beginner",
    duration: "4 modules, project-based",
    spotlight: "Beginner-first AI literacy for youth with a real build-and-publish path, safety grounding, and a first shipped app.",
    outcomes: [
      "Explain AI, machine learning, and LLMs in clear plain language.",
      "Use AI tools safely and responsibly with stronger privacy and risk awareness habits.",
      "Build and publish a first app using a real deployment workflow.",
    ],
    modules: [
      "AI Foundations and Safety",
      "Building Your First AI App",
      "Agents and Automations",
      "Publish, Showcase, Verify",
    ],
  },
  {
    badge: "",
    accent: "#7affc7",
    name: "AI Pioneer Homeschool Kit",
    audience: "Homeschool families and self-directed learners",
    level: "Beginner to intermediate",
    duration: "Semester-ready pacing",
    spotlight: "Structured AI curriculum with daily routines, projects, portfolio workflows, and transcript-friendly documentation.",
    outcomes: [
      "Run a repeatable weekly AI learning rhythm without guesswork.",
      "Build portfolio evidence that supports homeschool assessment and outside review.",
      "Translate projects into credits, reflections, and formal proof of work.",
    ],
    modules: [
      "Foundations",
      "Programming and Computational Thinking",
      "AI Projects and Creativity Studio",
      "Entrepreneurship and Portfolio",
    ],
  },
  {
    badge: "",
    accent: "#ffc56b",
    name: "Train-the-Trainer (T3)",
    audience: "Educators, facilitators, administrators",
    level: "Intermediate",
    duration: "4 modules, implementation-focused",
    spotlight: "Certification for educators and facilitators delivering ZEN programs safely, consistently, and at scale.",
    outcomes: [
      "Deliver ZEN curriculum with clearer pedagogy, accessibility coverage, and safety protocols.",
      "Use repeatable lesson structures, rubrics, and facilitation playbooks.",
      "Scale programs without losing quality or operational visibility.",
    ],
    modules: [
      "ZEN Teaching Standards and Safety",
      "Facilitation Playbooks",
      "Evaluation and Verification",
      "Scaling Programs",
    ],
  },
  {
    badge: "",
    accent: "#74f2ff",
    name: "Web3 & Blockchain Literacy",
    audience: "Beginners who need practical Web3 literacy",
    level: "Beginner to intermediate",
    duration: "4 modules, concept-to-application",
    spotlight: "Digital identity, wallets, credentials, and trust systems taught without hype and tied to real-world learning proof.",
    outcomes: [
      "Explain blockchains, wallets, and digital identity in practical terms.",
      "Protect credentials and identity using stronger operational hygiene.",
      "Understand how verifiable proof supports AI education, hiring, and reputation systems.",
    ],
    modules: [
      "Wallets, Safety, Digital Identity",
      "Tokens, NFTs, and SBTs",
      "Verifiable Credentials",
      "Real-World Applications",
    ],
  },
  {
    badge: "Experimentation lab",
    accent: "#ff79bb",
    name: "ZEN Arena",
    audience: "Builders comparing models, prompts, and tools",
    level: "Intermediate",
    duration: "4 modules, experimentation-focused",
    spotlight: "Model testing, prompt evaluation, and deployment patterns used by working teams that need signal instead of guesswork.",
    outcomes: [
      "Choose models based on cost, speed, and task fit instead of hype.",
      "Build a repeatable prompt evaluation workflow with testing discipline.",
      "Move prototypes toward production with fallbacks, monitoring, and observability.",
    ],
    modules: [
      "Model Basics and Selection",
      "Prompt Testing and Evaluation",
      "Tooling and Agent Experiments",
      "Deployment Patterns",
    ],
  },
];

const headerHeight = 660;
const cardHeight = 446;
const cardGap = 34;
const cardsTop = 1120;
const cardsHeight = programs.length * cardHeight + (programs.length - 1) * cardGap;
const previewsTop = cardsTop + cardsHeight + 150;
const footerTop = previewsTop + 430;
const posterHeight = footerTop + 120;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="${posterHeight}" viewBox="0 0 1600 ${posterHeight}" fill="none">
  <defs>
    <linearGradient id="bg" x1="800" y1="0" x2="800" y2="${posterHeight}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#04111f"/>
      <stop offset="1" stop-color="#020814"/>
    </linearGradient>
    <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(220 180) rotate(40) scale(460 380)">
      <stop stop-color="#2d7be4" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#2d7be4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1380 240) rotate(180) scale(420 320)">
      <stop stop-color="#9f6dff" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#9f6dff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowC" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 ${footerTop}) rotate(90) scale(760 860)">
      <stop stop-color="#18caa5" stop-opacity="0.14"/>
      <stop offset="1" stop-color="#18caa5" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
    <linearGradient id="frame" x1="60" y1="60" x2="1540" y2="${posterHeight - 60}" gradientUnits="userSpaceOnUse">
      <stop stop-color="#73f6ff"/>
      <stop offset="0.23" stop-color="#84b8ff"/>
      <stop offset="0.5" stop-color="#fad882"/>
      <stop offset="0.75" stop-color="#8effcb"/>
      <stop offset="1" stop-color="#7b9dff"/>
    </linearGradient>
    <linearGradient id="panelBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b2038" stop-opacity="0.92"/>
      <stop offset="1" stop-color="#061221" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="chipBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0b2340"/>
      <stop offset="1" stop-color="#071521"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000000" flood-opacity="0.34"/>
    </filter>
    <clipPath id="logoClip">
      <rect x="0" y="0" width="248" height="248" rx="20"/>
    </clipPath>
  </defs>

  <rect width="1600" height="${posterHeight}" rx="42" fill="url(#bg)"/>
  <rect width="1600" height="${posterHeight}" rx="42" fill="url(#glowA)"/>
  <rect width="1600" height="${posterHeight}" rx="42" fill="url(#glowB)"/>
  <rect width="1600" height="${posterHeight}" rx="42" fill="url(#glowC)"/>
  <rect width="1600" height="${posterHeight}" rx="42" fill="url(#grid)"/>
  <rect x="4" y="4" width="1592" height="${posterHeight - 8}" rx="40" stroke="url(#frame)" stroke-width="4"/>
  <rect x="18" y="18" width="1564" height="${posterHeight - 36}" rx="30" stroke="#98c6ff" stroke-opacity="0.14"/>

  ${textBlock({
    x: 72,
    y: 62,
    lines: ["United States AI literacy and capability portfolio"],
    size: 15,
    fill: "#73ebff",
    weight: 800,
    spacing: 4,
    uppercase: true,
  })}
  ${textBlock({
    x: 1528,
    y: 62,
    lines: ["ZEN AI Co. | svg master"],
    size: 15,
    fill: "#f6d690",
    weight: 800,
    spacing: 4,
    uppercase: true,
    anchor: "end",
  })}

  <g filter="url(#shadow)">
    <rect x="72" y="98" width="300" height="300" rx="34" fill="url(#panelBg)" stroke="#95ccff" stroke-opacity="0.14"/>
    <rect x="98" y="124" width="248" height="248" rx="20" fill="#081526" stroke="#ffffff" stroke-opacity="0.05"/>
    <image href="${logo}" x="98" y="124" width="248" height="248" preserveAspectRatio="xMidYMid meet" clip-path="url(#logoClip)"/>
  </g>

  <g filter="url(#shadow)">
    <rect x="396" y="98" width="1132" height="300" rx="34" fill="url(#panelBg)" stroke="#95ccff" stroke-opacity="0.14"/>
  </g>

  ${textBlock({
    x: 442,
    y: 154,
    lines: ["ZEN AI Co. | program portfolio"],
    size: 24,
    fill: "#f6d690",
    family: "Orbitron, Arial, sans-serif",
    weight: 700,
    spacing: 3,
    uppercase: true,
  })}
  ${textBlock({
    x: 442,
    y: 244,
    lines: ["AI Education.", "Deployment.", "Verification."],
    size: 84,
    fill: "#f5f7fb",
    family: "Orbitron, Arial, sans-serif",
    weight: 800,
    lineHeight: 1.02,
  })}
  ${textBlock({
    x: 442,
    y: 356,
    lines: [
      "A full-stack AI literacy ecosystem spanning youth entry points, homeschool delivery,",
      "professional operators, educator certification, Web3 credential literacy, and experimentation for working teams.",
    ],
    size: 23,
    fill: "#dbe5f6",
    weight: 500,
    lineHeight: 1.42,
  })}

  ${chip(72, 440, "6 programs", 150)}
  ${chip(238, 440, "24 core modules", 190)}
  ${chip(446, 440, "share-ready portfolio format", 280)}
  ${chip(744, 440, "public, educator, family, and workforce tracks", 474)}

  ${sectionPill(72, 530, "Portfolio snapshot", 220)}
  ${textBlock({
    x: 72,
    y: 610,
    lines: ["Built as a platform,", "not a single course."],
    size: 48,
    fill: "#f5f7fb",
    family: "Orbitron, Arial, sans-serif",
    weight: 800,
    lineHeight: 1.04,
  })}
  ${textBlock({
    x: 72,
    y: 704,
    lines: [
      "ZEN AI Co. covers youth access, family implementation, educator enablement, technical specialization,",
      "and professional upskilling through one branded ecosystem.",
    ],
    size: 20,
    fill: "#d4e1f4",
    weight: 500,
    lineHeight: 1.42,
  })}

  ${statsCard({
    x: 72,
    y: 760,
    value: "6",
    label: "Programs",
    body: "Youth, homeschool, educator, Web3, experimentation, and flagship professional tracks.",
  })}
  ${statsCard({
    x: 420,
    y: 760,
    value: "24",
    label: "Core modules",
    body: "Six distinct offerings, each with a clear four-module learning architecture.",
  })}
  ${statsCard({
    x: 768,
    y: 760,
    value: "3",
    label: "Value layers",
    body: "Public learners, institutional operators, and strategic partners or investors.",
  })}
  ${statsCard({
    x: 1116,
    y: 760,
    value: "1",
    label: "Brand system",
    body: "One visual and credential strategy across every learning surface and share asset.",
  })}

  ${sectionPill(72, 960, "All programs", 176)}
  ${textBlock({
    x: 72,
    y: 1040,
    lines: ["Program breakdown", "and module architecture"],
    size: 50,
    fill: "#f5f7fb",
    family: "Orbitron, Arial, sans-serif",
    weight: 800,
    lineHeight: 1.04,
  })}

  ${programs
    .map((program, index) => programCard({ x: 72, y: cardsTop + index * (cardHeight + cardGap), ...program }))
    .join("")}

  ${sectionPill(72, previewsTop - 90, "Brand proof", 164)}
  ${textBlock({
    x: 72,
    y: previewsTop - 10,
    lines: ["Designed to be shared,", "positioned to scale."],
    size: 48,
    fill: "#f5f7fb",
    family: "Orbitron, Arial, sans-serif",
    weight: 800,
    lineHeight: 1.04,
  })}
  ${textBlock({
    x: 72,
    y: previewsTop + 82,
    lines: [
      "This portfolio reads as a coordinated education and verification system with distinct products for beginners, families,",
      "facilitators, specialized learners, and workforce operators.",
    ],
    size: 20,
    fill: "#d4e1f4",
    weight: 500,
    lineHeight: 1.42,
  })}

  ${previewCard({
    x: 72,
    y: previewsTop + 138,
    href: previewB,
    title: "Core brand surface",
    lines: [
      "Premium ZEN identity applied to certificate-style surfaces",
      "and product-adjacent visual storytelling.",
    ],
  })}
  ${previewCard({
    x: 826,
    y: previewsTop + 138,
    href: previewA,
    title: "Partnership visual language",
    lines: [
      "Brand expression translated into future-tech and",
      "institutional collaboration contexts.",
    ],
  })}

  <text x="72" y="${posterHeight - 58}" fill="#dbe5f6" fill-opacity="0.82" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="600" letter-spacing="1.4">
    <tspan font-weight="800" fill="#f5f7fb">ZEN AI Co.</tspan>
    <tspan> | AI literacy, capability development, and verifiable learning infrastructure</tspan>
  </text>
  <g transform="translate(1308 ${posterHeight - 96})">
    <rect width="220" height="44" rx="22" fill="#0a2746" fill-opacity="0.88" stroke="#7fd7ff" stroke-opacity="0.18"/>
    <text x="110" y="29" text-anchor="middle" fill="#72ebff" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="4">ZENAI.WORLD</text>
  </g>
</svg>`;

writeFileSync(join(root, "zen-program-portfolio-infographic.svg"), svg, "utf8");
console.log(join(root, "zen-program-portfolio-infographic.svg"));

"use client";

import {
  ExternalLink,
  BadgeCheck,
  Cloud,
  Database,
  Cpu,
  BrainCircuit,
  Briefcase,
} from "lucide-react";

export default function AboutPage() {
  const expertise = [
    "Azure",
    ".NET",
    "Solution Architecture",
    "Cloud FinOps",
    "AI Integration",
    "Distributed Systems",
    "Next.js",
    "Storage Optimization",
  ];

  const capabilities = [
    "Duplicate Detection",
    "Storage Waste Analysis",
    "Region-Based Cost Estimation",
    "Storage Tier Intelligence",
    "Operational Insights",
    "Cloud FinOps Reporting",
  ];

  const technologies = [
    { icon: <Cloud className="w-4 h-4 text-cyan-400" />, name: "Microsoft Azure" },
    { icon: <Cpu className="w-4 h-4 text-cyan-400" />, name: ".NET 10" },
    { icon: <Database className="w-4 h-4 text-cyan-400" />, name: "Azure Storage" },
    { icon: <BrainCircuit className="w-4 h-4 text-cyan-400" />, name: "AI Powered" },
    { icon: <Briefcase className="w-4 h-4 text-cyan-400" />, name: "Enterprise Ready" },
  ];

  return (
    <div className="bg-[#0B1220] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            About BlobPulse
          </p>
          <h2 className="text-2xl font-semibold text-white mt-1">
            Azure Blob Storage Optimizer
          </h2>
        </div>

        <BadgeCheck className="w-7 h-7 text-cyan-400" />
      </div>

      <div className="p-6 space-y-10">

        {/* CREATOR */}
        <div className="flex items-center gap-4">
        <div className="relative">
            <img
                src="https://media.licdn.com/dms/image/v2/C5103AQFUlNPmhbfTLQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516673669811?e=2147483647&v=beta&t=RQaqCj-hwCK8-9a2mK-5G4bA8DUQaB_gGHUmFaXaHnc"
                alt="Tarun Kalal"
                className="w-20 h-20 rounded-full object-cover border border-white/10"
            />


            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0F172A]" />
        </div>

          <div>
            <h3 className="text-xl font-semibold text-white">
              Tarun Kalal
            </h3>

            <p className="text-cyan-400 text-sm mt-1">
              Software Architect & Lead Engineer
            </p>

            <p className="text-white/60 mt-1 leading-7 max-w-1xl">
              Designing cloud-native systems, enterprise platforms, AI-enabled
              solutions, and distributed architectures focused on scalability,
              performance, and cost efficiency.
            </p>
          </div>
        </div>

        {/* WHY */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-white font-semibold mb-3">Why BlobPulse?</h3>

          <p className="text-white/70 leading-7">
            BlobPulse provides deep visibility into Azure Blob Storage usage,
            helping teams detect duplicate data, analyze storage consumption,
            estimate costs across regions and tiers, and optimize cloud spend
            with actionable insights.
          </p>
        </div>

        {/* EXPERTISE */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
            Core Expertise
          </h3>

          <div className="flex flex-wrap gap-2">
            {expertise.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* TECHNOLOGIES */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
            Built With
          </h3>

          <div className="grid md:grid-cols-2 gap-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-white/70"
              >
                {tech.icon}
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* CAPABILITIES */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">
            Platform Capabilities
          </h3>

          <div className="grid md:grid-cols-2 gap-3">
            {capabilities.map((feature) => (
              <div
                key={feature}
                className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/70"
              >
                <span className="text-cyan-400 mr-2">✓</span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* LINKS (ONLY LINKEDIN LEFT) */}
        <div className="flex flex-wrap gap-3">
          <a
            href="https://in.linkedin.com/in/tarun-kalal-27050353"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-400 hover:bg-cyan-500/20 transition"
          >
            <ExternalLink className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-5 border-t border-white/10 bg-black/20">
        <p className="text-sm text-white/60">
          BlobPulse is an Azure-native storage optimization platform helping organizations reduce cloud cost and improve efficiency.
        </p>

        <p className="text-xs text-white/30 mt-2">
          © {new Date().getFullYear()} BlobPulse • Built by Tarun Kalal
        </p>
      </div>
    </div>
  );
}
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  a: A,
  // Checklists GFM (- [ ]): el input deshabilitado no tiene label; se sustituye por una marca decorativa
  input: (props) =>
    props.type === "checkbox" ? (
      <span
        aria-hidden="true"
        className="mr-2 inline-block h-4 w-4 translate-y-0.5 rounded border border-gold/60 align-middle"
      />
    ) : (
      <input {...props} />
    ),
  table: (props) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[480px] border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-line bg-white/[0.03] px-3 py-2 text-left font-semibold text-paper" {...props} />
  ),
  td: (props) => <td className="border-b border-line/60 px-3 py-2 align-top text-paper/85" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

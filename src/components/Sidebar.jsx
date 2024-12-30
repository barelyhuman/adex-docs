import { useLocation, Link } from "wouter-preact";

export function Sidebar({ items = [] } = {}) {
  const [location] = useLocation();

  const activeKey = items.find((d) => "/" + d.key === location);

  return (
    <ul class="sticky top-[50px] flex flex-col gap-4">
      {items.map((i) => (
        <SidebarItem item={i} active={activeKey && i.key == activeKey.key} />
      ))}
    </ul>
  );
}

function SidebarItem({ item, active }) {
  return (
    <li class="w-fit">
      <Link
        href={"/" + item.key}
        class={`group text-zinc-400 hover:text-zinc-100 ${
          active ? "text-zinc-100" : ""}`}
      >
        {item.label}
        <span
          class={`block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white ${
            active ? "max-w-full !bg-zinc-400" : ""
          }`}
        ></span>
      </Link>
    </li>
  );
}

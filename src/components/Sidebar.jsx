import { useLocation } from "preact-iso";

export function Sidebar({ items = [] } = {}) {
  const location = useLocation();

  const activeKey = items.find((d) => "/" + d.key === location.path);

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
      <a
        href={"/" + item.key}
        class={`group text-zinc-400 hover:text-zinc-400 ${
          active ? "text-zinc-200"   : ""}`}
      >
        {item.label}
        <span
          class={`block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white ${
            active ? "max-w-full !bg-zinc-400" : ""
          }`}
        ></span>
      </a>
    </li>
  );
}

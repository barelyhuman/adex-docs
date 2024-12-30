import { Sidebar } from "../components/Sidebar";
import { Link } from "../components/link";

export default function BaseLayout({ children, sideBarItems = [] }) {
  return (
    <div>
      <div class="min-h-[80vh] mx-auto max-w-screen-xl p-2">
        <header class="flex flex-col items-center justify-center h-[400px]">
          <h1 class="flex gap-2 items-center text-2xl font-semibold">
            <span>
              <svg
                class="w-14 h-14"
                viewBox="0 0 900 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="900" height="900" fill="#18181B" />
                <path
                  d="M398 381L633.575 615.577"
                  stroke="#868E96"
                  stroke-width="20"
                  stroke-linecap="round"
                />
                <path
                  d="M507 385L265 611"
                  stroke="#CED4DA"
                  stroke-width="20"
                  stroke-linecap="round"
                />
                <path
                  d="M440.936 289C444.785 282.333 454.407 282.333 458.256 289L466.917 284L458.256 289L638.823 601.75C642.672 608.417 637.86 616.75 630.162 616.75H269.03C261.332 616.75 256.521 608.417 260.37 601.75L440.936 289L432.276 284L440.936 289Z"
                  stroke="#F8F9FA"
                  stroke-width="20"
                />
              </svg>
            </span>
            <Link href="/" class="hover:underline hover:underline-offset-4">
              Adex
            </Link>
          </h1>
          <p>
            <small>
              An easier way to build full stack apps with Vite and Preact
            </small>
          </p>
        </header>
        <main class="flex flex-col gap-4 w-full sm:flex-row">
          <aside id="sidebar" class="flex-1 mx-2 text-sm">
            <Sidebar
              items={Object.values(sideBarItems).sort(
                (x, y) => x.order - y.order
              )}
              initialValue={Object.keys(sideBarItems)[0]}
            />
          </aside>
          <article class="flex-1 mb-10 min-w-full md:min-w-[75%] prose prose-invert text-zinc-300">
            {children}
          </article>
        </main>
      </div>
      <footer class="flex justify-between items-center p-2 mx-auto max-w-4xl border-t border-t-zinc">
        <p class="text-xs">
          <small>
            Powered by{" "}
            <a
              className="underline underline-offset-4"
              href="https://preachjs.github.io/docs-template/preachjs/docs-template"
            >
              preachjs/docs-template
            </a>{" "}
          </small>
        </p>
        <ul class="flex gap-4 justify-end">
          <li class="text-xs">
            <a
              class="w-full hover:underline hover:underline-offset-4"
              href="https://github.com/barelyhuman/adex"
            >
              Github
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

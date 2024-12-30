import { useParams } from "wouter-preact";
import { sideBar } from "../content/data";
import BaseLayout from "../layouts/base";
import {TableOfContents} from "../components/toc"

export default function ContentPage() {
  const params = useParams();
  const Content = sideBar[params.content]?.source || (() => <></>);
  return (
    <BaseLayout sideBarItems={sideBar}>
      <section class="flex gap-4 items-start w-full">
        <section class="w-full">
          <Content />
        </section>
        <nav class="sticky top-[50px] hidden md:block">
          <h6 class="font-semibold">On this page</h6>
          <TableOfContents items={Content.toc} />
        </nav>
      </section>
    </BaseLayout>
  );
}


import { useParams } from "wouter-preact";
import { sideBar } from "../content/data";
import BaseLayout from "../layouts/base";

export default function ContentPage() {
  const params = useParams();
  const Content = sideBar[params.content]?.source || (() => <></>);
  return (
    <BaseLayout sideBarItems={sideBar}>
      <Content />
    </BaseLayout>
  );
}

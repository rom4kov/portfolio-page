import { useContext } from "react";
import {
  TextElement,
  TextContext,
  TextContextType,
} from "../../contexts/text.context";

const Home = () => {
  const { texts } = useContext<TextContextType>(TextContext);
  const value = texts.find((obj) => {
    return obj.page === "home";
  }) as TextElement;

  return (
    <div id="route-container" className="h-full flex items-center justify-end">
      <div
        className="md:w-[22rem] mt-1 text-2xl text-left md:text-right md:leading-[2.10rem] lg:leading-[2.25rem] xl:leading-[2.15rem]"
        dangerouslySetInnerHTML={{ __html: value?.body }}
      />
    </div>
  );
};

export default Home;

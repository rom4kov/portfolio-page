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
  console.log(value);

  return (
    <div id="route-container" className="h-full flex items-center">
      <div
        className="w-[22rem] text-2xl text-right leading-[2.175rem]"
        dangerouslySetInnerHTML={{ __html: value?.body }}
      />
    </div>
  );
};

export default Home;

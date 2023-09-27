import "./ButtonMenu.scss";
import Operators from "./Operators/Operators";

type Props = {
    text : string, // mode : duo ou solo
}


const ButtonMenu: React.FC<Props> = ({text}) => {

  const buttonClicked = (text: string) => {
    if (text === "duo") {
      return hideButton;
    }

    if (text === "solo") {
      return hideButton;
    }
  };

  const hideButton: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const div = e.currentTarget;

    const soloDiv = document.querySelectorAll("h2")[0];
    const duoDiv = document.querySelectorAll("h2")[1];

    if (div != soloDiv && soloDiv.classList.contains("hide")) {
      // = si je click sur la duoDiv et que soloDiv est hide
      soloDiv.classList.remove("hide");
      return;
    }
    if (div != duoDiv && duoDiv.classList.contains("hide")) {
      // = si je click sur la duoDiv et que duoDiv est hide
      duoDiv.classList.remove("hide");
      return;
    }

    if (!div.classList.contains("hide")) {
      // = les deux boutons sont affichés sur l'ecran
      if (div == soloDiv)
        duoDiv.classList.add("hide");
      if (div == duoDiv)
        soloDiv.classList.add("hide");
    }
  };

  return (
    <div className={"menu_btn " + text}>
      <h2 onClick={buttonClicked(text)}>{text.toUpperCase()}</h2>
      <Operators mode={text == "duo" ? "solo" : "duo"}/>
    </div>
  );
};

export default ButtonMenu;

import React from "react";
import Button from "../Button/Button";
import { FaUserFriends, GiShoppingBag, GiFruitBowl ,MdFastfood,CiCoffeeCup} from "react-icons/all";
const RightSider = () => {
  return (
    <aside className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto w-full bg-[#fafafa]">
      <h2 className="font-[500] px-2">Suggested for you</h2>
      <Button
        title={"Fashion Trends "}
        icon={<GiShoppingBag size={25} className="text-blue-700"/>}
      />
      <Button title={"Get Groceries"} icon={<GiFruitBowl size={25} className="text-green-700"/>} />
      <Button title={"Order Food"} icon={<MdFastfood size={25} className="text-yellow-600"/>} />
      <Button title={"Grab a coffee"} icon={<CiCoffeeCup size={25} className="text-red-900"/>} />
    </aside>
  );
};

export default RightSider;

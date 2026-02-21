import { IoMdSearch } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";

type Props = object;

export default function HeaderActions({}: Props) {
  return (
    <div className="flex items-center gap-4">
      <IoMdSearch className="text-xl cursor-pointer" />
      <PiShoppingCartSimpleBold className="text-xl cursor-pointer" />
    </div>
  );
}

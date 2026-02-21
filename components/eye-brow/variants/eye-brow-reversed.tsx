import ButtonLink from "@/components/buttons/button-link";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  info: {
    title: string;
    description: string;
  };
  link: string;
  linkText?: string;
};

export default function EyeBrowReversed({ info, link, linkText = "" }: Props) {
  if (!link) throw new Error("Eyebrow Default requires href link");
  return (
    <div className="w-full flex items-end justify-between">
      <div className="space-y-2">
        <h2>{info.title}</h2>
        <p className="text-sm text-muted-foreground uppercase">
          {info.description}
        </p>
      </div>
      <Link className="font-inter text-xs" href={link}>
        <ButtonLink className="group text-sm">
          {linkText || "View All"}{" "}
          <FaArrowRight className="group-hover:translate-x-1 h-3! w-3! relative transition-transform duration-200 ease-in-out" />
        </ButtonLink>
      </Link>
    </div>
  );
}

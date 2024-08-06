import { ReactNode } from "react";

export default function Section({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="w-full">
      <h3 className="font-bold text-xl text-center">{title}</h3>
      <div className="bg-white w-full rounded-lg p-2 mt-2 space-y-2">
        {children}
      </div>
    </div>
  );
}

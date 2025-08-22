import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconBadgeProps {
  isActive: boolean;
  activeIcon: IconDefinition;
  inActiveIcon: IconDefinition;
}

export default function IconBadge({
  isActive,
  activeIcon,
  inActiveIcon,
}: IconBadgeProps) {
  return (
    <div
      className={`${
        isActive ? "bg-neutral-500" : "bg-blue-600"
      } shrink-0 relative rounded-full size-10 flex justify-center items-center p-1`}
    >
      <FontAwesomeIcon
        icon={isActive ? activeIcon : inActiveIcon}
        className="text-lg text-white"
      />
    </div>
  );
}

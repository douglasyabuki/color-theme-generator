import { exportThemeVars } from "../../utils/export-theme-vars";
import { containerColorsList } from "./cards-lists/container-colors-list";
import { fixedColorsList } from "./cards-lists/fixed-colors-list";
import { inverseColorsList } from "./cards-lists/inverse-colors-list";
import { mainColorsList } from "./cards-lists/main-colors-list";
import { surfaceColorsList } from "./cards-lists/surface-colors-list";
import { surfaceContainersList } from "./cards-lists/surface-containers-list";
import { ColoredCard } from "./colored-card/ColoredCard";

export const ColoredCardsGrid = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-auto flex-1 grid-cols-4 gap-4 self-stretch">
        {[...mainColorsList, ...containerColorsList, ...fixedColorsList].map(
          ({ name, className }) => (
            <ColoredCard key={name} name={name} className={className}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis ea
              modi rerum expedita ex minima, consequatur veritatis. Aperiam vel
              dignissimos velit, provident omnis iste, necessitatibus cum, ex
              sint unde ducimus.
            </ColoredCard>
          ),
        )}
      </div>
      <div className="grid w-auto flex-1 grid-cols-4 gap-4 self-stretch">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="col-span-3 flex">
            {surfaceColorsList.map(({ name, className }) => (
              <ColoredCard key={name} name={name} className={className}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                ea modi rerum expedita ex minima, consequatur veritatis. Aperiam
                vel dignissimos velit, provident omnis iste, necessitatibus cum,
                ex sint unde ducimus.
              </ColoredCard>
            ))}
          </div>
          <div className="col-span-3 flex">
            {surfaceContainersList.map(({ name, className }) => (
              <ColoredCard key={name} name={name} className={className}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                ea modi rerum expedita ex minima, consequatur veritatis. Aperiam
                vel dignissimos velit, provident omnis iste, necessitatibus cum,
                ex sint unde ducimus.
              </ColoredCard>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          {inverseColorsList.map(({ name, className }) => (
            <ColoredCard key={name} name={name} className={className}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
              nostrum excepturi modi, tempore amet temporibus illum itaque
              repudiandae repellendus doloribus sequi sint rem debitis aut
              veniam ab animi molestias corrupti.
            </ColoredCard>
          ))}
        </div>
        <button
          onClick={() => exportThemeVars()}
          className="secondary mt-20 rounded-sm py-1 font-bold"
        >
          Export css
        </button>
      </div>
    </div>
  );
};

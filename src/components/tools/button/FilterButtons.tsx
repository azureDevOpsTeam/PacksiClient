import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  FC,
  MouseEvent,
} from "react";

interface Button {
  id: string;
  value: any;
  label: string;
  icon?: React.ReactNode;
  category: string;
}

interface DropdownButton extends Button {
  options?: { id: string; label: string }[];
}

interface FilterButtonsProps {
  buttons: DropdownButton[];
  onButtonClick: (button: Button, selectedOption?: string) => void;
}

const FilterButtons: FC<FilterButtonsProps> = ({ buttons, onButtonClick }) => {
  const activeButtonsRef = useRef<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  const handleClickOutside = useCallback(
    (event: MouseEvent<Document>) => {
      const currentRef = openDropdown && dropdownRefs.current[openDropdown];
      if (currentRef && !currentRef.contains(event.target as Node)) {
        closeDropdown();
      }
    },
    [openDropdown, closeDropdown]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as any);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, [handleClickOutside]);

  const handleButtonClick = useCallback(
    (button: DropdownButton) => {
      const { category, id, options } = button;

      if (options) {
        setOpenDropdown((prev) => (prev === id ? null : id));
        if (selectedOptions[id]) {
          setSelectedOptions((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
          });
        }
      } else {
        if (activeButtonsRef.current[category] === id) {
          delete activeButtonsRef.current[category];
        } else {
          activeButtonsRef.current[category] = id;
        }
        onButtonClick(button);
      }
    },
    [onButtonClick, selectedOptions]
  );

  const handleOptionSelect = useCallback(
    (button: DropdownButton, option: { id: string; label: string }) => {
      setSelectedOptions((prev) => ({ ...prev, [button.id]: option.label }));
      closeDropdown();
      onButtonClick(button, option.id);
    },
    [onButtonClick, closeDropdown]
  );

  const isActive = useCallback(
    (button: DropdownButton) =>
      button.options
        ? !!selectedOptions[button.id]
        : activeButtonsRef.current[button.category] === button.id,
    [selectedOptions]
  );
  useEffect(() => {
    const allButton = buttons.find((btn) => btn.category === "all");
    if (!allButton) return;

    if (allButton.options && allButton.options.length > 0) {
      // اگر dropdown بود، گزینه اول رو انتخاب کن
      const firstOption = allButton.options[0];
      setSelectedOptions((prev) => ({
        ...prev,
        [allButton.id]: firstOption.label,
      }));
      onButtonClick(allButton, firstOption.id);
    } else {
      // اگر dropdown نبود، activeش کن
      activeButtonsRef.current[allButton.category] = allButton.id;
      onButtonClick(allButton);
    }
  }, [buttons, onButtonClick]);

  return (
    <div className="flex flex-wrap items-center gap-2.5 w-full">
      {buttons.map((button) => {
        const active = isActive(button);
        return (
          <div key={button.id} className="relative">
            <div
              className={`min-w-[100px] h-[34px] px-3 py-1.5 rounded-[28px] inline-flex items-center gap-2.5 cursor-pointer shadow transition-all hover:scale-95 active:scale-100 ${
                active
                  ? "bg-[#FF7959] text-white"
                  : "bg-gray-200 text-[#111928]"
              }`}
              onClick={() => handleButtonClick(button)}
            >
              <span className="text-sm font-bold">
                {button.options
                  ? selectedOptions[button.id] || button.label
                  : button.label}
              </span>
              {button.icon && <span className="text-lg">{button.icon}</span>}
            </div>

            {openDropdown === button.id && button.options && (
              <div
                ref={(el) => (dropdownRefs.current[button.id] = el)}
                className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-2xl z-10"
              >
                <ul className="py-1">
                  {button.options.map((option) => (
                    <li
                      key={option.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleOptionSelect(button, option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterButtons;

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const MENU_DROPDOWN_SIZE_STYLES = {
  sm: {
    wrapper: "max-w-[280px]",
    label: "text-xs",
    trigger: "rounded-[10px] px-3 py-2 text-sm",
    triggerPadWithIcon: "pl-10",
    triggerIcon: "left-3 size-4",
    chevron: "right-3 size-4",
    menu: "top-[calc(100%+8px)] rounded-[14px] p-1.5",
    option: "rounded-[10px] px-2.5 py-2",
    optionGridWithIconAndDescription:
      "grid-cols-[16px_1fr] grid-rows-[auto_auto] gap-x-2.5 gap-y-0.5",
    optionGridWithIconOnly: "grid-cols-[16px_1fr] grid-rows-1 gap-x-2.5",
    optionGridWithoutIcon: "grid-cols-1 grid-rows-[auto_auto] gap-y-0.5",
    optionTitle: "text-sm leading-5",
    optionDescription: "text-xs leading-4",
    optionIcon: "size-4",
  },
  md: {
    wrapper: "max-w-[320px]",
    label: "text-sm",
    trigger: "rounded-[12px] px-4 py-3 text-[15px]",
    triggerPadWithIcon: "pl-12",
    triggerIcon: "left-4 size-5",
    chevron: "right-4 size-5",
    menu: "top-[calc(100%+10px)] rounded-[18px] p-2",
    option: "rounded-[12px] px-3 py-2.5",
    optionGridWithIconAndDescription:
      "grid-cols-[20px_1fr] grid-rows-[auto_auto] gap-x-3 gap-y-1",
    optionGridWithIconOnly: "grid-cols-[20px_1fr] grid-rows-1 gap-x-3",
    optionGridWithoutIcon: "grid-cols-1 grid-rows-[auto_auto] gap-y-1",
    optionTitle: "text-[15px] leading-5",
    optionDescription: "text-sm leading-5",
    optionIcon: "size-5",
  },
  lg: {
    wrapper: "max-w-[380px]",
    label: "text-base",
    trigger: "rounded-[14px] px-5 py-3.5 text-base",
    triggerPadWithIcon: "pl-14",
    triggerIcon: "left-5 size-5",
    chevron: "right-5 size-5",
    menu: "top-[calc(100%+12px)] rounded-[20px] p-2.5",
    option: "rounded-[14px] px-4 py-3",
    optionGridWithIconAndDescription:
      "grid-cols-[20px_1fr] grid-rows-[auto_auto] gap-x-3.5 gap-y-1",
    optionGridWithIconOnly: "grid-cols-[20px_1fr] grid-rows-1 gap-x-3.5",
    optionGridWithoutIcon: "grid-cols-1 grid-rows-[auto_auto] gap-y-1",
    optionTitle: "text-base leading-6",
    optionDescription: "text-sm leading-5",
    optionIcon: "size-5",
  },
};

export const MENU_DROPDOWN_COLOR_STYLES = {
  sky: {
    label: "text-slate-500",
    triggerFrame: "border-slate-200 bg-white",
    triggerText: "text-sky-900",
    triggerPlaceholder: "text-sky-700/50",
    triggerIcon: "text-sky-700/70",
    chevron: "text-slate-500",
    menuFrame: "border-slate-200 bg-white",
    optionTitle: "text-sky-900",
    optionTitleSelected: "text-sky-700",
    optionDescription: "text-slate-500",
    optionIcon: "text-slate-500/80",
    optionIconSelected: "text-sky-700",
    optionSelectedBg: "bg-sky-500/10",
    optionHoverBg: "hover:bg-sky-500/[0.06] focus-visible:bg-sky-500/[0.06]",
  },
  emerald: {
    label: "text-slate-500",
    triggerFrame: "border-slate-200 bg-white",
    triggerText: "text-emerald-900",
    triggerPlaceholder: "text-emerald-700/50",
    triggerIcon: "text-emerald-700/70",
    chevron: "text-slate-500",
    menuFrame: "border-slate-200 bg-white",
    optionTitle: "text-emerald-900",
    optionTitleSelected: "text-emerald-700",
    optionDescription: "text-slate-500",
    optionIcon: "text-slate-500/80",
    optionIconSelected: "text-emerald-700",
    optionSelectedBg: "bg-emerald-500/10",
    optionHoverBg: "hover:bg-emerald-500/[0.06] focus-visible:bg-emerald-500/[0.06]",
  },
  rose: {
    label: "text-slate-500",
    triggerFrame: "border-slate-200 bg-white",
    triggerText: "text-rose-900",
    triggerPlaceholder: "text-rose-700/50",
    triggerIcon: "text-rose-700/70",
    chevron: "text-slate-500",
    menuFrame: "border-slate-200 bg-white",
    optionTitle: "text-rose-900",
    optionTitleSelected: "text-rose-700",
    optionDescription: "text-slate-500",
    optionIcon: "text-slate-500/80",
    optionIconSelected: "text-rose-700",
    optionSelectedBg: "bg-rose-500/10",
    optionHoverBg: "hover:bg-rose-500/[0.06] focus-visible:bg-rose-500/[0.06]",
  },
  slate: {
    label: "text-slate-500",
    triggerFrame: "border-slate-300 bg-white",
    triggerText: "text-slate-900",
    triggerPlaceholder: "text-slate-500",
    triggerIcon: "text-slate-600/80",
    chevron: "text-slate-500",
    menuFrame: "border-slate-300 bg-white",
    optionTitle: "text-slate-900",
    optionTitleSelected: "text-slate-800",
    optionDescription: "text-slate-500",
    optionIcon: "text-slate-500/80",
    optionIconSelected: "text-slate-700",
    optionSelectedBg: "bg-slate-500/10",
    optionHoverBg: "hover:bg-slate-500/[0.06] focus-visible:bg-slate-500/[0.06]",
  },
};

export const MENU_DROPDOWN_DEFAULT_OPTIONS = [
  {
    value: "public",
    title: "Public",
    description: "Shared with anyone who has the link",
    Icon: PublicIcon,
  },
  {
    value: "limited",
    title: "Limited to workspace",
    description: "Shared with anyone in your workspace",
    Icon: LimitedIcon,
  },
  {
    value: "private",
    title: "Private",
    description: "Only accessible to you",
    Icon: PrivateIcon,
  },
];

export default function MenuDropdown({
  options = MENU_DROPDOWN_DEFAULT_OPTIONS,
  value,
  defaultValue = "",
  onChange,
  label = "Share with",
  placeholder = "Select an option",
  name = "menu-dropdown",
  id,
  size = "md",
  color = "sky",
  theme,
  showTriggerIcon = true,
  showOptionIcon = true,
  disabled = false,
  className,
  labelClassName,
  triggerClassName,
  menuClassName,
  optionClassName,
  selectedOptionClassName,
}) {
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const previousSelectionRef = useRef(defaultValue ?? "");
  const reactId = useId();

  const normalizedOptions = useMemo(
    () => normalizeOptions(options),
    [options]
  );

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [isOpen, setIsOpen] = useState(false);

  const selectedValue = isControlled ? value ?? "" : internalValue;
  const selectedOption = normalizedOptions.find(
    (option) => option.value === selectedValue
  );

  const sizeStyles =
    MENU_DROPDOWN_SIZE_STYLES[size] ?? MENU_DROPDOWN_SIZE_STYLES.md;
  const colorStyles = {
    ...(MENU_DROPDOWN_COLOR_STYLES[color] ?? MENU_DROPDOWN_COLOR_STYLES.sky),
    ...(theme ?? {}),
  };

  const baseId = id ?? `menu-dropdown-${reactId.replace(/:/g, "")}`;
  const labelId = `${baseId}-label`;
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;

  const setSelectedValue = (nextValue) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    const selected = normalizedOptions.find(
      (option) => option.value === nextValue
    );
    onChange?.(nextValue, selected ?? null);
  };

  const openMenu = () => {
    if (disabled) return;
    previousSelectionRef.current = selectedValue;
    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  const toggleMenu = () => {
    if (disabled) return;
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  };

  const focusOption = (index) => {
    optionRefs.current[index]?.focus();
  };

  const chooseByIndex = (index) => {
    const next = normalizedOptions[index];
    if (!next || next.disabled) return;
    setSelectedValue(next.value);
  };

  const chooseOption = (nextValue) => {
    setSelectedValue(nextValue);
    closeMenu();
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const restoreSelection = () => {
    setSelectedValue(previousSelectionRef.current);
  };

  useEffect(() => {
    if (!normalizedOptions.some((option) => option.value === selectedValue)) {
      if (!isControlled) {
        setInternalValue("");
      }
    }
  }, [isControlled, normalizedOptions, selectedValue]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  const onTriggerKeyDown = (event) => {
    if (disabled) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
      }
      const firstEnabled = normalizedOptions.findIndex((option) => !option.disabled);
      if (firstEnabled >= 0) {
        requestAnimationFrame(() => {
          focusOption(firstEnabled);
          chooseByIndex(firstEnabled);
        });
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  };

  const onOptionKeyDown = (event, index) => {
    const option = normalizedOptions[index];
    if (!option || option.disabled) return;

    let shouldClose = false;
    let shouldFocusTrigger = true;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseOption(option.value);
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      const prevIndex = getNextEnabledIndex(normalizedOptions, index, -1);
      if (prevIndex >= 0) {
        chooseByIndex(prevIndex);
        focusOption(prevIndex);
      }
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = getNextEnabledIndex(normalizedOptions, index, 1);
      if (nextIndex >= 0) {
        chooseByIndex(nextIndex);
        focusOption(nextIndex);
      }
    }

    if (event.key === "Tab") {
      const firstEnabled = normalizedOptions.findIndex((item) => !item.disabled);
      const lastEnabled = getLastEnabledIndex(normalizedOptions);
      if (
        (!event.shiftKey && index === lastEnabled) ||
        (event.shiftKey && index === firstEnabled)
      ) {
        shouldClose = true;
        shouldFocusTrigger = false;
      }
    }

    if (event.key === "Escape") {
      event.preventDefault();
      restoreSelection();
      shouldClose = true;
    }

    if (shouldClose) {
      closeMenu();
      if (shouldFocusTrigger) {
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }
  };

  return (
    <section
      ref={wrapperRef}
      className={cn("w-full", sizeStyles.wrapper, className)}
    >
      <label
        id={labelId}
        htmlFor={triggerId}
        className={cn(
          "mb-2 block font-medium",
          sizeStyles.label,
          colorStyles.label,
          labelClassName
        )}
      >
        {label}
      </label>

      <div className="relative">
        <select
          aria-hidden
          tabIndex={-1}
          value={selectedValue}
          onChange={() => {}}
          className="sr-only"
          name={name}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {normalizedOptions.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.title}
            </option>
          ))}
        </select>

        <button
          id={triggerId}
          ref={triggerRef}
          type="button"
          aria-labelledby={labelId}
          aria-controls={menuId}
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={toggleMenu}
          onKeyDown={onTriggerKeyDown}
          className={cn(
            "relative w-full border text-left font-medium shadow-[0_1px_1px_-0.5px_rgba(15,23,42,0.05),0_2px_2px_-1px_rgba(15,23,42,0.06),0_5px_5px_-2px_rgba(15,23,42,0.06)] transition duration-300",
            sizeStyles.trigger,
            colorStyles.triggerFrame,
            selectedOption ? colorStyles.triggerText : colorStyles.triggerPlaceholder,
            showTriggerIcon && selectedOption?.Icon && sizeStyles.triggerPadWithIcon,
            disabled && "cursor-not-allowed opacity-60",
            triggerClassName
          )}
        >
          {showTriggerIcon && selectedOption?.Icon ? (
            <selectedOption.Icon
              className={cn(
                "absolute top-1/2 -translate-y-1/2",
                sizeStyles.triggerIcon,
                colorStyles.triggerIcon
              )}
            />
          ) : null}

          <span>{selectedOption?.title ?? placeholder}</span>

          <ChevronIcon
            className={cn(
              "absolute top-1/2 -translate-y-1/2 transition-transform duration-300",
              sizeStyles.chevron,
              colorStyles.chevron,
              isOpen && "rotate-180"
            )}
          />
        </button>

        <ul
          id={menuId}
          role="menu"
          aria-hidden={!isOpen}
          className={cn(
            "absolute left-0 z-20 m-0 flex w-full origin-top flex-col gap-1 border p-0 shadow-[0_1px_1px_-0.5px_rgba(15,23,42,0.05),0_2px_2px_-1px_rgba(15,23,42,0.06),0_10px_12px_-4px_rgba(15,23,42,0.08),0_24px_28px_-10px_rgba(15,23,42,0.09)] transition-all duration-500 ease-[cubic-bezier(0.66,0,0.34,1)]",
            sizeStyles.menu,
            colorStyles.menuFrame,
            isOpen
              ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
              : "pointer-events-none -translate-y-3 scale-y-75 opacity-0",
            menuClassName
          )}
        >
          {normalizedOptions.map((option, index) => {
            const isSelected = selectedValue === option.value;
            const hasDescription = Boolean(option.description);
            const hasIcon = Boolean(showOptionIcon && option.Icon);
            const iconAndDescription = hasIcon && hasDescription;

            return (
              <li key={option.value} className="m-0 list-none p-0">
                <button
                  ref={(node) => {
                    optionRefs.current[index] = node;
                  }}
                  type="button"
                  role="menuitem"
                  tabIndex={isOpen && !option.disabled ? 0 : -1}
                  disabled={option.disabled}
                  onClick={() => chooseOption(option.value)}
                  onKeyDown={(event) => onOptionKeyDown(event, index)}
                  className={cn(
                    "grid w-full text-left transition-all duration-500 ease-[cubic-bezier(0.66,0,0.34,1)]",
                    sizeStyles.option,
                    iconAndDescription
                      ? sizeStyles.optionGridWithIconAndDescription
                      : hasIcon
                      ? sizeStyles.optionGridWithIconOnly
                      : sizeStyles.optionGridWithoutIcon,
                    isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    isSelected ? colorStyles.optionSelectedBg : colorStyles.optionHoverBg,
                    option.disabled && "cursor-not-allowed opacity-50",
                    optionClassName,
                    isSelected && selectedOptionClassName
                  )}
                  style={{
                    transitionDelay: isOpen ? `${(index + 1) * 50}ms` : "0ms",
                  }}
                >
                  {hasIcon ? (
                    <option.Icon
                      className={cn(
                        sizeStyles.optionIcon,
                        hasDescription && "row-span-2 mt-0.5",
                        isSelected
                          ? colorStyles.optionIconSelected
                          : colorStyles.optionIcon
                      )}
                    />
                  ) : null}

                  <span
                    className={cn(
                      hasIcon ? "col-start-2" : "col-start-1",
                      sizeStyles.optionTitle,
                      isSelected
                        ? colorStyles.optionTitleSelected
                        : colorStyles.optionTitle
                    )}
                  >
                    {option.title}
                  </span>

                  {hasDescription ? (
                    <span
                      className={cn(
                        hasIcon ? "col-start-2" : "col-start-1",
                        sizeStyles.optionDescription,
                        colorStyles.optionDescription
                      )}
                    >
                      {option.description}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function normalizeOptions(options) {
  if (!Array.isArray(options)) return [];
  return options.map((option, index) => {
    const value = String(
      option.value ?? option.id ?? option.title ?? option.label ?? index
    );
    return {
      value,
      title: option.title ?? option.label ?? value,
      description: option.description ?? "",
      Icon: option.Icon ?? option.icon ?? null,
      disabled: Boolean(option.disabled),
    };
  });
}

function getNextEnabledIndex(options, fromIndex, direction) {
  let nextIndex = fromIndex + direction;
  while (nextIndex >= 0 && nextIndex < options.length) {
    if (!options[nextIndex].disabled) return nextIndex;
    nextIndex += direction;
  }
  return -1;
}

function getLastEnabledIndex(options) {
  for (let index = options.length - 1; index >= 0; index -= 1) {
    if (!options[index].disabled) return index;
  }
  return -1;
}

function ChevronIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 9a1 1 0 0 0-.707 1.707l5 5a1 1 0 0 0 1.414 0l5-5A1 1 0 0 0 17 9z"
      />
    </svg>
  );
}

function PublicIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m2 11.4l-1.564 1.251a.5.5 0 0 0-.041.744l1.239 1.239a2 2 0 0 1 .508.864l.175.613a1.8 1.8 0 0 0 1.017 1.163a8 8 0 0 0 2.533-1.835l-.234-1.877a2 2 0 0 0-1.09-1.54l-1.47-.736A1 1 0 0 0 14 13.4M12 4a7.99 7.99 0 0 0-6.335 3.114l-.165.221V9.02a3 3 0 0 0 1.945 2.809l.178.06l1.29.395c1.373.42 2.71-.697 2.577-2.096l-.019-.145l-.175-1.049a1 1 0 0 1 .656-1.108l.108-.03l.612-.14a2.667 2.667 0 0 0 1.989-3.263A8 8 0 0 0 12 4" />
    </svg>
  );
}

function LimitedIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 21H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h10c.265 0 .518.052.75.145" />
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-3-5V7a4 4 0 1 1 8 0v4m3 11v.01M19 19a2.003 2.003 0 0 0 .914-3.782a1.98 1.98 0 0 0-2.414.483" />
    </svg>
  );
}

function PrivateIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" />
    </svg>
  );
}

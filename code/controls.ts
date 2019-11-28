import { ControlType, PropertyControls } from "framer"

export const keyEventTriggerNames = ["onKeyDown", "onKeyUp"]

export const eventTriggerNames = [
    "onTap",
    "onTapStart",
    "onTapCancel",
    "onHoverStart",
    "onHoverEnd",
    "onDragStart",
    "onDragEnd",
    ...keyEventTriggerNames,
]

export const eventTriggerTitles = {
    onTap: "On Tap",
    onTapStart: "Tap Start",
    onTapCancel: "Tap Cancel",
    onHoverStart: "Hover Start",
    onHoverEnd: "Hover End",
    onDragStart: "Drag Start",
    onDragEnd: "Drag End",
    onKeyDown: "Key Down",
    onKeyUp: "Key Up",
}

export const eventTriggerProps = [
    ...eventTriggerNames,
    ...eventTriggerNames.map(name => `${name}Action`),
    ...eventTriggerNames.map(name => `${name}SpecificIndex`),
    ...keyEventTriggerNames.map(name => `${name}Key`),
]

export const keyEventTriggerProps = [
    ...keyEventTriggerNames.map(name => `${name}Action`),
    ...keyEventTriggerNames.map(name => `${name}SpecificIndex`),
    ...keyEventTriggerNames.map(name => `${name}Key`),
]

export const eventTriggerPropertyControls: PropertyControls = eventTriggerNames.reduce(
    (res, trigger) => {
        res[`${trigger}Action`] = {
            title: eventTriggerTitles[trigger] || trigger,
            type: ControlType.Enum,
            options: ["unset", "specific", "previous", "next"],
            optionTitles: [
                "Not Set",
                "Specific State",
                "Previous State",
                "Next State",
            ],
            hidden: props => props.isInteractive === false,
        }

        res[`${trigger}SpecificIndex`] = {
            title: "↳ State",
            type: ControlType.Number,
            displayStepper: true,
            defaultValue: 0,
            hidden: props =>
                props.isInteractive === false ||
                props[`${trigger}Action`] !== "specific",
        }

        if (keyEventTriggerNames.indexOf(trigger) !== -1) {
            res[`${trigger}Key`] = {
                title: "↳ Key",
                type: ControlType.String,
                defaultValue: "",
                hidden: props =>
                    props.isInteractive === false ||
                    props[`${trigger}Action`] === "unset",
            }
        }

        return res
    },
    {}
)
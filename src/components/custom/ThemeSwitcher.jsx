"use client";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly aria-label="Change Theme">
          {theme === "light" ? <Sun /> : <Moon />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="dark" onClick={() => setTheme("dark")}>
          Dark
        </DropdownItem>
        <DropdownItem key="light" onClick={() => setTheme("light")}>
          Light
        </DropdownItem>
        <DropdownItem key="system" onClick={() => setTheme("system")}>
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default ThemeSwitcher;

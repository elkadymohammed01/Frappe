// import blocks
import Header from "./header";
import Paragraph from "./paragraph";
import Card from "./card";
import Chart from "./chart";
import Shortcut from "./shortcut";
import Spacer from "./spacer";
import Onboarding from "./onboarding";
import QuickList from "./quick_list";
import NumberCard from "./number_card";
<<<<<<< HEAD
=======
import CustomBlock from "./custom_block";
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)

// import tunes
import HeaderSize from "./header_size";

frappe.provide("frappe.workspace_block");

frappe.workspace_block.blocks = {
	header: Header,
	paragraph: Paragraph,
	card: Card,
	chart: Chart,
	shortcut: Shortcut,
	spacer: Spacer,
	onboarding: Onboarding,
	quick_list: QuickList,
	number_card: NumberCard,
<<<<<<< HEAD
=======
	custom_block: CustomBlock,
>>>>>>> 65c3c38821 (chore(release): Bumped to Version 14.42.0)
};

frappe.workspace_block.tunes = {
	header_size: HeaderSize,
};

export interface VmAccordionObject {
    heading: string;
    url: string;
    icon: string;
    group: VmAccordionGroup[];
}
export interface VmAccordionGroup {
    name: string;
    url: string;
    icon: string;
    children: VmAccordionGroup[];
}
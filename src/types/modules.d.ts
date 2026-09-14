declare module 'lucide-react' {
  import * as React from 'react'

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number
    color?: string
    strokeWidth?: string | number
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >

  export const Scissors: LucideIcon
  export const Sparkles: LucideIcon
  export const Star: LucideIcon
  export const ShieldCheck: LucideIcon
  export const Clock: LucideIcon
  export const Calendar: LucideIcon
  export const User: LucideIcon
  export const LogOut: LucideIcon
  export const Menu: LucideIcon
  export const X: LucideIcon
  export const MapPin: LucideIcon
  export const Phone: LucideIcon
  export const Mail: LucideIcon
  export const Instagram: LucideIcon
  export const Facebook: LucideIcon
  export const MessageSquare: LucideIcon
  export const Send: LucideIcon
  export const ArrowRight: LucideIcon
  export const ChevronRight: LucideIcon
  export const ChevronLeft: LucideIcon
  export const CheckCircle2: LucideIcon
  export const FileText: LucideIcon
  export const XCircle: LucideIcon
  export const AlertCircle: LucideIcon
  export const Lock: LucideIcon
  export const Home: LucideIcon
  export const Quote: LucideIcon
  export const Check: LucideIcon

  const icons: { [key: string]: LucideIcon }
  export default icons
}

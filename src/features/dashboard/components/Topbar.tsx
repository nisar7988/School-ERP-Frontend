import { Search, Bell, HelpCircle, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TopbarProps {
  title?: string
  showSearch?: boolean
  user?: {
    name: string
    role: string
    avatar?: string
  }
}

export function Topbar({ 
  title, 
  showSearch = true,
  user = {
    name: "Alex Mercer",
    role: "Sophomore",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
  }
}: TopbarProps) {
  return (
    <header className="h-20 px-10 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-30">
      <div className="flex-1 flex items-center">
        {title ? (
          <h1 className="text-xl font-bold text-gray-900 display-title">{title}</h1>
        ) : showSearch ? (
          <div className="w-96 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
            <Input 
              placeholder="Search students, courses..." 
              className="pl-11 bg-gray-50/50 border-transparent focus:bg-white"
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-gray-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 lg:inline-flex hidden">
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 lg:inline-flex hidden">
          <Settings className="w-5 h-5" />
        </Button>
        
        <div className="ml-4 flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-1">{user.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-brand-orange/10 ring-offset-2">
            <img 
              src={user.avatar} 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

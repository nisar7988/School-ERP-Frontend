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
    <header className="h-16 px-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-30 border-b border-gray-100">
      <div className="flex-1 flex items-center">
        {title ? (
          <h1 className="text-lg font-bold text-gray-900 display-title">{title}</h1>
        ) : showSearch ? (
          <div className="w-80 relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
            <Input 
              placeholder="Search students, classes..." 
              className="pl-10 h-9 bg-gray-50 border-gray-100 focus:bg-white text-sm rounded-xl"
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative text-gray-500 w-9 h-9">
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>
        <Button variant="ghost" size="icon" className="text-gray-500 lg:inline-flex hidden w-9 h-9">
          <HelpCircle className="w-4.5 h-4.5" />
        </Button>
        
        <div className="ml-2 flex items-center gap-2.5 pl-3 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ring-2 ring-brand-orange/10 ring-offset-1">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt="User" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-orange text-white font-bold text-sm">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-gray-700 font-semibold text-sm gap-1.5 h-8 px-2 hover:bg-gray-50">
            <Settings className="w-3.5 h-3.5 text-gray-400" />
            Settings
          </Button>
        </div>
      </div>
    </header>
  )
}

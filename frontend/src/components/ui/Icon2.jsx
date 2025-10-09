import * as Icons from "lucide-react";

const icons = {
    BookOpen: Icons.BookOpen,
    Brain: Icons.Brain,
    Briefcase: Icons.Briefcase,
    Calendar: Icons.Calendar,
    CheckCircle: Icons.CheckCircle,
    Code: Icons.Code,
    FileText: Icons.FileText,
    FilePlus2: Icons.FilePlus2,
    GraduationCap: Icons.GraduationCap,
    Info: Icons.Info,
    Laptop: Icons.Laptop,
    Layers: Icons.Layers,
    Megaphone: Icons.Megaphone,
    Newspaper: Icons.Newspaper,
    Palette: Icons.Palette,
    PenTool: Icons.PenTool,
    Sparkles: Icons.Sparkles, 
};

export default function Icon2({ icon, size, className }) {
    const IconComponent = icons[icon] || Icons.FileText;
    
    return <IconComponent size={size} className={className} />
}
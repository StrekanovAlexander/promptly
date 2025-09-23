import * as Icons from "lucide-react";

const icons = {
    FileText: Icons.FileText,
    Code: Icons.Code,
    Megaphone: Icons.Megaphone,
    Palette: Icons.Palette,
    GraduationCap: Icons.GraduationCap,
    Briefcase: Icons.Briefcase,
    Info: Icons.Info,
    Sparkles: Icons.Sparkles, 
    Calendar: Icons.Calendar,
    Layers: Icons.Layers 
};

export default function Icon({ icon }) {
    const IconComponent = icons[icon] || Icons.FileText;
    return <IconComponent className="w-5 h-5" />
}
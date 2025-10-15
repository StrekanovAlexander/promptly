export default async function (req, res) { 
    const response = await fetch("https://api.promptly.team/api/sitemap.xml"); 
    const xml = await response.text(); 
    res.setHeader("Content-Type", "application/xml"); 
    res.send(xml); 
}
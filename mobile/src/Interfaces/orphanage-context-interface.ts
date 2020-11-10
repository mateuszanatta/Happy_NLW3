export default interface OrphanageContextInterface{
    name: string,
    about: string,
    instructions: string,
    opening_hours: string,
    whatsapp: string,
    open_on_weekends: boolean,
    latitude: string;
    longitude: string;
    setLatitude(lat: string): () => {}; 
    setLongitude(lng: string): () => {}; 
    setName(name: string): () => {}; 
    setAbout(about: string): () => {}; 
    setInstructions(instructions: string): () => {}; 
    setOpeningHours(openingHours: string): () => {}; 
    setWhatsApp(whatsApp: string): () => {}; 
    setOpenOnWeekends(openOnWeekends: string): () => {}; 
    setOpenOnWeekends(openOnWeekends: string): () => {}; 
}
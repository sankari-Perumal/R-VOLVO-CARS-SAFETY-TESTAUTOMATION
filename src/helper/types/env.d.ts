export{};
declare global{
    namespace NodeJS{
        interface processENV
        {
            BROWESR:"chrome"|"firfox",
            BASEURL:string
        }
    }
}
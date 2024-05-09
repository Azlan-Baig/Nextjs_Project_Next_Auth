import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST }
// route ki files me aap method ka koi bh name likhdein wo nahi chalta hai aapko GET, POST ya koi or sa http method ka name he likhna parhta hai q k frameworks hain standards set hain..   
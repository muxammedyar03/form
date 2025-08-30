// "use client"

// import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// interface PermissionContextType {
//   hasPermission: boolean
//   loading: boolean
// }

// const PermissionContext = createContext<PermissionContextType>({
//   hasPermission: false,
//   loading: true,
// })

// export function usePermission() {
//   return useContext(PermissionContext)
// }

// export function PermissionProvider({ children }: { children: ReactNode }) {
//   const [hasPermission, setHasPermission] = useState(false)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchPermission() {
//       try {
//         const res = await fetch("/api/permission", { cache: "no-store" })
//         const data = await res.json()
//         setHasPermission(data.permission)
//       } catch (e) {
//         console.error("Permission fetch error", e)
//       } finally {
//         setLoading(false)
//       }
//     }
  
//     fetchPermission()
//   }, [])

//   return (
//     <PermissionContext.Provider value={{ hasPermission, loading }}>
//       {children}
//     </PermissionContext.Provider>
//   )
// }

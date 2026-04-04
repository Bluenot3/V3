import "node:module";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import.meta.url;
//#endregion
//#region vite.config.ts
const __vite_injected_original_dirname = "/sessions/intelligent-fervent-turing/mnt/VANGUARD-2-codex-vanguard-2-desktop";
var vite_config_default = defineConfig({
	plugins: [react()],
	resolve: { alias: { "@": path.resolve(__vite_injected_original_dirname, "./src") } },
	server: {
		host: "0.0.0.0",
		port: 3e3
	},
	build: {
		target: "es2020",
		cssCodeSplit: true,
		chunkSizeWarningLimit: 600,
		rollupOptions: { output: { manualChunks: {
			"vendor-react": [
				"react",
				"react-dom",
				"react-router-dom"
			],
			"vendor-supabase": ["@supabase/supabase-js"],
			"vendor-mermaid": ["mermaid"]
		} } }
	}
});
//#endregion
export { vite_config_default as default };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL3Nlc3Npb25zL2ludGVsbGlnZW50LWZlcnZlbnQtdHVyaW5nL21udC9WQU5HVUFSRC0yLWNvZGV4LXZhbmd1YXJkLTItZGVza3RvcC92aXRlLmNvbmZpZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICAgIHBvcnQ6IDMwMDAsXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgICB0YXJnZXQ6ICdlczIwMjAnLFxuICAgICAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogNjAwLFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29yZSBSZWFjdCBydW50aW1lIOKAlCBjYWNoZWQgYWdncmVzc2l2ZWx5XG4gICAgICAgICAgICAgICAgICAgICd2ZW5kb3ItcmVhY3QnOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgICAgICAgICAgIC8vIEhlYXZ5IHRoaXJkLXBhcnR5IGxpYnMg4oCUIHNwbGl0IHRvIGF2b2lkIG1vbm9saXRoaWMgYnVuZGxlXG4gICAgICAgICAgICAgICAgICAgICd2ZW5kb3Itc3VwYWJhc2UnOiBbJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddLFxuICAgICAgICAgICAgICAgICAgICAndmVuZG9yLW1lcm1haWQnOiBbJ21lcm1haWQnXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFNLG1DQUE2QjtBQUluQyxJQUFBLHNCQUFlLGFBQWE7Q0FDeEIsU0FBUyxDQUFDLE9BQU8sQ0FBQztDQUNsQixTQUFTLEVBQ0wsT0FBTyxFQUNILEtBQUssS0FBSyxRQUFBLGtDQUFtQixRQUFRLEVBQ3hDLEVBQ0o7Q0FDRCxRQUFRO0VBQ0osTUFBTTtFQUNOLE1BQU07RUFDVDtDQUNELE9BQU87RUFDSCxRQUFRO0VBQ1IsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixlQUFlLEVBQ1gsUUFBUSxFQUNKLGNBQWM7R0FFVixnQkFBZ0I7SUFBQztJQUFTO0lBQWE7SUFBbUI7R0FFMUQsbUJBQW1CLENBQUMsd0JBQXdCO0dBQzVDLGtCQUFrQixDQUFDLFVBQVU7R0FDaEMsRUFDSixFQUNKO0VBQ0o7Q0FDSixDQUFDIn0=
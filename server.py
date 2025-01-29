from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import sys

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

    def do_GET(self):
        # Serve index.html for root path
        if self.path == '/':
            self.path = '/index.html'
        try:
            return super().do_GET()
        except Exception as e:
            print(f"Error serving {self.path}: {str(e)}", file=sys.stderr)
            self.send_error(500, f"Internal server error: {str(e)}")

def run_server():
    try:
        # Change to the directory containing this script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)

        # Print debug information
        print(f'Current directory: {os.getcwd()}')
        print(f'Available files: {os.listdir()}')

        # Start server on port 3000
        port = 3000
        server = HTTPServer(('0.0.0.0', port), CORSRequestHandler)
        print(f'Starting server at http://0.0.0.0:{port}')
        print(f'You can view the landing page at: https://{os.getenv("REPL_SLUG")}.{os.getenv("REPL_OWNER")}.repl.co')
        server.serve_forever()
    except Exception as e:
        print(f"Server error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    run_server()
# Use the official NGINX image
FROM nginx:alpine

# Copy the custom NGINX configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the exported Next.js static files to the default NGINX directory
COPY ./cogiscan-frontend /usr/share/nginx/html

# Expose port 8000
EXPOSE 8000

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
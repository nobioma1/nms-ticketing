# Ticketing

NextJs/Express/NATs Micro-services architecture with Docker/Kubernetes

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

For development, you will need to have installed on your machine:

- [Next.js](https://nextjs.org/)
- [Docker](https://skaffold.dev/docs/install/), and enable kubernetes
- [Skaffold](https://skaffold.dev/docs/install/)
- [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/)

### To start app

Add JWT_KEY to Kubernetes Secrets

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<secret>
```

In root directory, run `skaffold dev`

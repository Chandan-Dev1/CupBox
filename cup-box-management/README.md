# Cup & Box Capacity Management (MERN)

A starter monolithic MERN project for managing cup dimensions, box dimensions, estimating packing capacity, and recommending suitable box sizes.

## Requirements
- Node.js 20+
- MongoDB local service or MongoDB Atlas

## Run the backend
```bash
cd backend
```
Copy `.env.example` to `.env` and edit `MONGO_URI` if needed.

Windows PowerShell:
```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

## Run the frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL (usually `http://localhost:5173`).

## Use
1. Open **Cups** and add a cup.
2. Open **Boxes** and add a box.
3. Open **Capacity Calculator**, choose a cup and enter quantity.
4. Review capacities and box recommendations.

## API
- `GET /api/cups`
- `POST /api/cups`
- `GET /api/boxes`
- `POST /api/boxes`
- `POST /api/capacity/recommend`

## Example
Cup: diameter 6 cm, height 10 cm, stock 500, price ₹2.
Box: internal dimensions 30 × 20 × 25 cm, stock 20, price ₹50.
Approximate capacity: 30 cups per box; 70 cups need 3 boxes; box cost ₹150.

## Important limitations
Dimensions are in centimetres and box dimensions must be internal. The calculator models each cup as a `diameter × diameter × height` rectangular bounding box and tries six axis-aligned orientations. This is an estimate, not a guarantee of physical fit. It does not model tapered cup geometry, handles, padding, dividers, staggered packing, or manufacturing tolerances. Recommendations compare one box type at a time; they do not optimize mixed box combinations. Stock is not deducted during calculation. Authentication and production security are not included.

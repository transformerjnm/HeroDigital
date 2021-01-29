import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	/** 
	 * react app location -- for testing on localhost - http://localhost:3000
	 * for running with build version http://localhost:5000
	 */
	origin: "http://localhost:5000",
	credentials: true
}));

app.post('/emailupdates', (req, res) => {
	/** Data required for registration is present */
	if (req.body.firstName && req.body.lastName && req.body.email && req.body.euResident && (req.body.advances || req.body.alerts || req.body.other)) {
		res.statusCode = 200;
		res.send({
			"status": "success",
			"message": "Thank You. You are now subscribed."
		});
	} else {
		res.statusCode = 400;
		res.send({
			"status": "error",
			"message": "Invalid Subscription request. Please try agin."
		});
	}
});

app.post('/*', (req, res) => {
	res.statusCode = 404;
	res.send({
		"status": "error",
		"message": "The endpoint you are looking for dose not exist."
	});
});

//start server
app.listen(PORT, () => {
	console.log(`API Server is now available on port ${PORT}`);
});
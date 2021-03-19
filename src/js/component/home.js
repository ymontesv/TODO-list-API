import React, { useState, useEffect } from "react";

export function Home() {
	const [task, setTask] = useState("");
	const [check, setCheck] = useState(false);
	const [lista, setLista] = useState([]);
	useEffect(() => {
		CallAPI();
	}, ["CallAPI"]);

	let LinkAPI = "https://assets.breatheco.de/apis/fake/todos/user/ymontesv";

	const CallAPI = async () => {
		await fetch(LinkAPI)
			.then(res => res.json())
			.then(data => {
				setLista(data);
			})
			.catch(error => console.error("error:", error.message));
	};

	const putAPI = lista => {
		console.log(lista);
		fetch(LinkAPI, {
			method: "Put",
			body: JSON.stringify(lista),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				CallAPI();
				//alert(data.result);
			});
	};

	return (
		<div className="container mt-5 text-center">
			<div className="row d-flex justify-content-center">
				<div className="col-md-10">
					<div className="card">
						<h1 className="display-5 text-primary">To Do List</h1>
						<div className="card-header">
							<div className="row mt-4">
								<div className="col-sm-8 pb-3">
									<label>Task</label>
									<input
										className="form-control"
										type="text"
										value={task}
										onChange={e => {
											setTask(
												e.target.value.toUpperCase()
											);
										}}
									/>
								</div>
								<div className="col-sm-1 pb-3">
									<label>Done</label>
									<input
										type="checkbox"
										className="form-control"
										checked={check}
										onChange={e =>
											setCheck(e.target.checked)
										}
									/>
								</div>
								<div className="col-sm-3 pb-3 d-flex align-items-end">
									<button
										type="button"
										className="form-control btn btn-primary"
										onClick={() => {
											let obj = {
												label: task,
												done: check
											};
											setLista(lista.concat(obj));
											setCheck(false);
											setTask("");
											//console.log({ lista });
										}}>
										Add List
									</button>
								</div>
							</div>
						</div>
						<div className="card-body text-primary">
							{!lista
								? "loading..."
								: lista.map((item, index) => {
										return (
											<label
												className="form-control text-left px-5"
												key={index}>
												<input
													type="checkbox"
													checked={item.done}
												/>
												{item.label}
											</label>
										);
								  })}
						</div>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => putAPI(lista)}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

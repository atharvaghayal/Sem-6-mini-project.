document.getElementById('financeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        income: document.getElementById('income').value,
        expense: document.getElementById('expense').value,
        investment: document.getElementById('investment').value,
        loan: document.getElementById('loan').value,
        month: document.getElementById('month').value
    };

    fetch('/generate_graphs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('lineGraph').src = "/static/line_graph.png";
            document.getElementById('barGraph').src = "/static/bar_graph.png";
            document.getElementById('pieChart').src = "/static/pie_chart.png";
        }
    });
});

function showGraph(graphId) {
    document.querySelectorAll('.graph').forEach(img => img.classList.add('hidden'));
    document.getElementById(graphId).classList.remove('hidden');
}
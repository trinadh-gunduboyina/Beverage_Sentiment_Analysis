// ✅ File: src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import SentimentChart from './SentimentChart';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const FileUpload = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [brandSummary, setBrandSummary] = useState({});

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/Upload/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status >= 400) {
        throw new Error(response.data?.message || 'Upload failed');
      }

      setData(response.data);

      const sentimentCounts = response.data.reduce(
        (acc, curr) => {
          acc[curr.sentiment] = (acc[curr.sentiment] || 0) + 1;
          return acc;
        },
        { Positive: 0, Neutral: 0, Negative: 0 }
      );

      setChartData({
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
          {
            label: 'Sentiment Breakdown',
            data: [
              sentimentCounts.Positive,
              sentimentCounts.Neutral,
              sentimentCounts.Negative,
            ],
            backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
          },
        ],
      });

      const brandWise = {};
      response.data.forEach((item) => {
        const brands = item.brand.split(',').map(b => b.trim());
        brands.forEach(brand => {
          if (!brandWise[brand]) {
            brandWise[brand] = { Positive: 0, Neutral: 0, Negative: 0 };
          }
          brandWise[brand][item.sentiment] = (brandWise[brand][item.sentiment] || 0) + 1;
        });
      });
      setBrandSummary(brandWise);

    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.response?.data?.message || 'Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Brand', 'Positive', 'Neutral', 'Negative'];
    const rows = Object.entries(brandSummary).map(([brand, counts]) => [
      brand,
      counts.Positive,
      counts.Neutral,
      counts.Negative,
    ]);
    let csvContent = '';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'brand_sentiment_summary.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Brand-wise Sentiment Summary', 14, 16);
    const tableColumn = ['Brand', 'Positive', 'Neutral', 'Negative'];
    const tableRows = Object.entries(brandSummary).map(([brand, counts]) => [
      brand,
      counts.Positive,
      counts.Neutral,
      counts.Negative,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 22,
      theme: 'grid',
      headStyles: { fillColor: [211, 47, 47] },
    });
    doc.save('brand_sentiment_summary.pdf');
  };

  return (
    <div>
      <h2>Upload Review CSV</h2>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleUpload}
        disabled={loading}
      />
      {loading && <p>Uploading and analyzing...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {chartData && (
        <div className="chart-container">
          <SentimentChart chartData={chartData} />
        </div>
      )}
      {Object.keys(brandSummary).length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Brand-wise Sentiment Summary</h3>
          <table style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Brand</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Positive</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Neutral</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Negative</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(brandSummary).map(([brand, counts]) => (
                <tr key={brand}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{brand}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{counts.Positive}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{counts.Neutral}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{counts.Negative}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button onClick={handleExportCSV} style={{ padding: '0.5rem 1.2rem', borderRadius: '6px', border: 'none', background: '#1976d2', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Export CSV</button>
            <button onClick={handleExportPDF} style={{ padding: '0.5rem 1.2rem', borderRadius: '6px', border: 'none', background: '#d32f2f', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Export PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

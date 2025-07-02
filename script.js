const SUPABASE_URL = 'https://labmhtrafdslfwqmzgky.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhYm1odHJhZmRzbGZ3cW16Z2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTAzNzksImV4cCI6MjA2NTI2NjM3OX0.CviQ3lzngfvqDFwEtDw5cTRSEICWliunXngYCokhbNs';

const form = document.getElementById('survey-form');
const q5 = document.getElementById('q5');
const q5AmountWrapper = document.getElementById('q5-amount-wrapper');

q5.addEventListener('change', () => {
  q5AmountWrapper.style.display = (q5.value === 'はい') ? 'block' : 'none';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {
    q1: formData.get('q1'),
    q2: formData.get('q2'),
    q3: formData.get('q3') || null,
    q4: formData.get('q4'),
    q5: formData.get('q5'),
    q5_amount: formData.get('q5_amount') || null,
    q6: formData.get('q6') || null,
    created_at: new Date().toISOString()
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/survey_responses`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    form.reset();
    q5AmountWrapper.style.display = 'none';
    const thanksImage = document.getElementById('thanks-image-container');
    thanksImage.style.display = 'block';
    setTimeout(() => {
      thanksImage.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  } else {
    alert('送信に失敗しました。再度お試しください。');
  }
});

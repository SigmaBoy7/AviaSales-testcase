export async function createSearchSession() {
  try {
    const request = await fetch('https://aviasales-test-api.kata.academy/search', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });
    const response = await request.json();
    return response;
  } catch (err) {
    throw new Error('Ошибка при создании сессии');
  }
}

export async function getTickets() {
  let errorCount = 0;
  try {
    const request = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${localStorage.getItem('searchId')}`
    );
    const response = await request.json();
    errorCount = 0;
    return response;
  } catch (err) {
    errorCount += 1;
    if (errorCount === 10) {
      throw new Error('Часть билетов пропало!');
    } else {
      return await getTickets();
    }
  }
}

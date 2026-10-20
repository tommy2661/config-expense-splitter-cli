/* =========================================================
   /* === STATO GLOBALE E CHIAVI LOCALSTORAGE === */
/* ========================================================= */

const STORAGE_KEY_PEOPLE = 'pari_people_list';
const STORAGE_KEY_EXPENSES = 'pari_expenses_list';

// Dati predefiniti da caricare al primo avvio
const DEFAULT_PEOPLE = ['Marco', 'Giulia', 'Luca', 'Sara'];
const DEFAULT_EXPENSES = [
  {
    id: '1',
    description: 'Cena in spiaggia',
    amountCents: 12000,
    paidBy: 'Marco',
    splitBetween: ['Marco', 'Giulia', 'Luca', 'Sara']
  },
  {
    id: '2',
    description: 'Noleggio auto',
    amountCents: 9000,
    paidBy: 'Giulia',
    splitBetween: ['Marco', 'Giulia', 'Luca', 'Sara']
  },
  {
    id: '3',
    description: 'Spesa al supermercato',
    amountCents: 6000,
    paidBy: 'Luca',
    splitBetween: ['Marco', 'Giulia', 'Luca', 'Sara']
  }
];

// Array reattivi dell'applicazione
let people = [];
let expenses = [];

// Insieme di persone selezionate per la spesa in corso
let selectedForSplit = [];

/* =========================================================
   /* === RIFERIMENTI DOM === */
/* ========================================================= */

// Header & Modale
const infoBtn = document.querySelector('#info-btn');
const infoModal = document.querySelector('#info-modal');
const closeModalBtn = document.querySelector('#close-modal-btn');

// Sezione Persone
const peopleCountEl = document.querySelector('#people-count');
const peopleChipsContainer = document.querySelector('#people-chips');
const personNameInput = document.querySelector('#person-name-input');
const addPersonBtn = document.querySelector('#add-person-btn');
const personFeedbackEl = document.querySelector('#person-feedback');

// Sezione Nuova Spesa
const expenseDescInput = document.querySelector('#expense-desc-input');
const expenseAmountInput = document.querySelector('#expense-amount-input');
const expensePayerSelect = document.querySelector('#expense-payer-select');
const splitLabelEl = document.querySelector('#split-label');
const splitChipsContainer = document.querySelector('#split-chips-container');
const addExpenseBtn = document.querySelector('#add-expense-btn');
const expenseFeedbackEl = document.querySelector('#expense-feedback');

// Sezione Lista Spese
const expensesTotalAmountEl = document.querySelector('#expenses-total-amount');
const expensesListEl = document.querySelector('#expenses-list');

// Sezione Conti da Saldare
const settlementListEl = document.querySelector('#settlement-list');
const settlementPerPersonEl = document.querySelector('#settlement-per-person');
const settlementTransfersCountEl = document.querySelector('#settlement-transfers-count');

// Azione Secondaria
const resetExpensesBtn = document.querySelector('#reset-expenses-btn');

/* =========================================================
   /* === FUNZIONI DI UTILITÀ E FORMATTAZIONE === */
/* ========================================================= */

// Formatta un importo numerico (euro) in valuta italiana (es. 120,00 €)
function formatCurrency(euros) {
  return euros.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
}

// Mostra un messaggio di feedback/errore temporaneo nella sezione persone
let personFeedbackTimer = null;
function showPersonMessage(text) {
  if (!text) {
    personFeedbackEl.textContent = '';
    personFeedbackEl.classList.remove('error');
    return;
  }
  personFeedbackEl.textContent = text;
  personFeedbackEl.classList.add('error');
  clearTimeout(personFeedbackTimer);
  personFeedbackTimer = setTimeout(function () {
    personFeedbackEl.textContent = '';
    personFeedbackEl.classList.remove('error');
  }, 4000);
}

// Mostra o nasconde l'errore di validazione sotto il form spesa
function showExpenseError(text) {
  if (!text) {
    expenseFeedbackEl.textContent = '';
    expenseFeedbackEl.classList.remove('error');
    return;
  }
  expenseFeedbackEl.textContent = text;
  expenseFeedbackEl.classList.add('error');
}

// Salva le persone correnti nel localStorage del browser
function savePeopleToStorage() {
  localStorage.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(people));
}

// Salva le spese correnti nel localStorage del browser
function saveExpensesToStorage() {
  localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(expenses));
}

/* =========================================================
   /* === GESTIONE PERSONE === */
/* ========================================================= */

// Inizializza i dati dal localStorage o dai valori di default
function initData() {
  const savedPeople = localStorage.getItem(STORAGE_KEY_PEOPLE);
  const savedExpenses = localStorage.getItem(STORAGE_KEY_EXPENSES);

  if (savedPeople === null) {
    people = [...DEFAULT_PEOPLE];
    savePeopleToStorage();
  } else {
    try {
      people = JSON.parse(savedPeople) || [];
    } catch (e) {
      people = [...DEFAULT_PEOPLE];
    }
  }

  if (savedExpenses === null) {
    expenses = [...DEFAULT_EXPENSES];
    saveExpensesToStorage();
  } else {
    try {
      expenses = JSON.parse(savedExpenses) || [];
    } catch (e) {
      expenses = [...DEFAULT_EXPENSES];
    }
  }

  // Inizialmente tutte le persone disponibili sono selezionate per dividere
  selectedForSplit = [...people];
}

// Aggiunge una nuova persona alla lista
function addPerson() {
  const cleanName = personNameInput.value.trim();

  // Controllo se il nome è vuoto
  if (cleanName === '') {
    showPersonMessage('Inserisci un nome valido.');
    return;
  }

  // Controllo limite massimo di 8 persone
  if (people.length >= 8) {
    showPersonMessage('Puoi aggiungere al massimo 8 persone.');
    return;
  }

  // Controllo duplicati (case-insensitive: "Marco" == "marco")
  const isDuplicate = people.some(function (p) {
    return p.toLowerCase() === cleanName.toLowerCase();
  });

  if (isDuplicate) {
    showPersonMessage('Questo nome è già presente nella lista.');
    return;
  }

  // Aggiunge la persona
  people.push(cleanName);
  selectedForSplit.push(cleanName);
  savePeopleToStorage();

  // Pulisce l'input e l'errore
  personNameInput.value = '';
  showPersonMessage('');

  // Aggiorna l'interfaccia utente
  renderAll();
}

// Rimuove una persona se non è coinvolta in nessuna spesa
function removePerson(personName) {
  // Verifica se la persona ha pagato una spesa o fa parte di chi la divide
  const isLinkedToExpense = expenses.some(function (exp) {
    return exp.paidBy === personName || exp.splitBetween.includes(personName);
  });

  if (isLinkedToExpense) {
    showPersonMessage('Prima elimina le spese che coinvolgono ' + personName);
    return;
  }

  // Rimuove dai partecipanti
  people = people.filter(function (p) {
    return p !== personName;
  });

  // Rimuove anche dai selezionati correnti del form
  selectedForSplit = selectedForSplit.filter(function (p) {
    return p !== personName;
  });

  savePeopleToStorage();
  showPersonMessage('');
  renderAll();
}

// Aggiorna visivamente i chip dei partecipanti nella sezione "Chi c'è"
function renderPeople() {
  // Aggiorna il contatore (es. "1 persona", "4 persone")
  const count = people.length;
  peopleCountEl.textContent = count === 1 ? '1 persona' : count + ' persone';

  peopleChipsContainer.innerHTML = '';

  people.forEach(function (person) {
    const chip = document.createElement('div');
    chip.className = 'person-chip';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = person;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'chip-delete-btn';
    deleteBtn.setAttribute('aria-label', 'Rimuovi ' + person);
    deleteBtn.innerHTML = '<span class="material-symbols-rounded">close</span>';

    deleteBtn.addEventListener('click', function () {
      removePerson(person);
    });

    chip.appendChild(nameSpan);
    chip.appendChild(deleteBtn);
    peopleChipsContainer.appendChild(chip);
  });
}

/* =========================================================
   /* === FORM NUOVA SPESA === */
/* ========================================================= */

// Popola il menu a discesa "Pagato da" e i chip di "Dividi tra"
function renderNewExpenseForm() {
  const currentPayer = expensePayerSelect.value;
  expensePayerSelect.innerHTML = '';

  // Popola select "Pagato da"
  people.forEach(function (person) {
    const option = document.createElement('option');
    option.value = person;
    option.textContent = person;
    if (person === currentPayer) {
      option.selected = true;
    }
    expensePayerSelect.appendChild(option);
  });

  // Se non c'era una selezione valida e ci sono persone, seleziona la prima
  if (!expensePayerSelect.value && people.length > 0) {
    expensePayerSelect.value = people[0];
  }

  // Aggiorna i chip di "Dividi tra"
  splitChipsContainer.innerHTML = '';

  // Filtra selectedForSplit rimuovendo eventuali persone non più esistenti
  selectedForSplit = selectedForSplit.filter(function (p) {
    return people.includes(p);
  });

  // Se vuoto ma ci sono persone, riseleziona tutti
  if (selectedForSplit.length === 0 && people.length > 0) {
    selectedForSplit = [...people];
  }

  // Aggiorna l'etichetta del contatore selezionati
  const selCount = selectedForSplit.length;
  splitLabelEl.textContent = 'Dividi tra (' + selCount + (selCount === 1 ? ' selezionato)' : ' selezionati)');

  people.forEach(function (person) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-split-chip';
    btn.textContent = person;

    const isSelected = selectedForSplit.includes(person);
    if (isSelected) {
      btn.classList.add('selected');
    }

    btn.addEventListener('click', function () {
      toggleSplitPerson(person);
    });

    splitChipsContainer.appendChild(btn);
  });
}

// Seleziona o deseleziona una persona dal riparto della spesa
function toggleSplitPerson(person) {
  if (selectedForSplit.includes(person)) {
    selectedForSplit = selectedForSplit.filter(function (p) {
      return p !== person;
    });
  } else {
    selectedForSplit.push(person);
  }
  renderNewExpenseForm();
}

// Valida e aggiunge una nuova spesa
function addExpense() {
  const desc = expenseDescInput.value.trim();
  const rawAmount = expenseAmountInput.value.trim();
  const paidBy = expensePayerSelect.value;

  // 1. Validazione descrizione
  if (desc === '') {
    showExpenseError('Inserisci cosa hai comprato.');
    expenseDescInput.focus();
    return;
  }

  // 2. Validazione importo (supporta sia virgola sia punto decimale)
  const normalizedAmount = rawAmount.replace(',', '.');
  const parsedAmount = parseFloat(normalizedAmount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    showExpenseError('Inserisci un importo valido maggiore di zero.');
    expenseAmountInput.focus();
    return;
  }

  // 3. Validazione persona pagante
  if (!paidBy) {
    showExpenseError('Aggiungi o seleziona una persona per "Pagato da".');
    return;
  }

  // 4. Validazione selezione partecipanti alla spesa
  if (selectedForSplit.length === 0) {
    showExpenseError('Seleziona almeno una persona tra cui dividere la spesa.');
    return;
  }

  // Calcolo importo in centesimi per prevenire errori di floating point
  const amountCents = Math.round(parsedAmount * 100);

  // Creazione dell'oggetto spesa
  const newExpense = {
    id: Date.now().toString(),
    description: desc,
    amountCents: amountCents,
    paidBy: paidBy,
    splitBetween: [...selectedForSplit]
  };

  expenses.push(newExpense);
  saveExpensesToStorage();

  // Reset campi del form e riposizionamento focus
  expenseDescInput.value = '';
  expenseAmountInput.value = '';
  showExpenseError('');
  expenseDescInput.focus();

  // Ricalcolo e aggiornamento generale dell'interfaccia
  renderAll();
}

// Elimina una spesa tramite il suo ID
function removeExpense(expenseId) {
  expenses = expenses.filter(function (exp) {
    return exp.id !== expenseId;
  });
  saveExpensesToStorage();
  renderAll();
}

/* =========================================================
   /* === LISTA SPESE === */
/* ========================================================= */

// Aggiorna l'elenco delle spese e calcola il totale complessivo
function renderExpenses() {
  let totalCents = 0;
  expensesListEl.innerHTML = '';

  if (expenses.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'empty-state';
    emptyDiv.textContent = 'Ancora nessuna spesa';
    expensesListEl.appendChild(emptyDiv);
  } else {
    expenses.forEach(function (exp) {
      totalCents += exp.amountCents;

      const item = document.createElement('div');
      item.className = 'expense-item';

      const infoDiv = document.createElement('div');
      infoDiv.className = 'expense-info';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'expense-name';
      nameSpan.textContent = exp.description;

      const subSpan = document.createElement('span');
      subSpan.className = 'expense-sub';
      const splitCount = exp.splitBetween.length;
      const quoteText = splitCount === 1 ? '1 quota' : splitCount + ' quote';
      subSpan.textContent = 'pagato da ' + exp.paidBy + ' · ' + quoteText;

      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(subSpan);

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'expense-actions';

      const amountSpan = document.createElement('span');
      amountSpan.className = 'expense-amount';
      amountSpan.textContent = formatCurrency(exp.amountCents / 100);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn-delete-expense';
      deleteBtn.setAttribute('aria-label', 'Elimina spesa ' + exp.description);
      deleteBtn.innerHTML = '<span class="material-symbols-rounded">close</span>';

      deleteBtn.addEventListener('click', function () {
        removeExpense(exp.id);
      });

      actionsDiv.appendChild(amountSpan);
      actionsDiv.appendChild(deleteBtn);

      item.appendChild(infoDiv);
      item.appendChild(actionsDiv);
      expensesListEl.appendChild(item);
    });
  }

  // Mostra il totale formattato in euro
  expensesTotalAmountEl.textContent = formatCurrency(totalCents / 100);
}

/* =========================================================
   /* === CALCOLO CONTI E MIN-TRANSFER === */
/* ========================================================= */

// Calcola i saldi netti di ciascun partecipante (in centesimi interi)
function calculateBalances() {
  const balances = {};

  // Inizializza il saldo a zero per tutti i partecipanti correnti
  people.forEach(function (p) {
    balances[p] = 0;
  });

  expenses.forEach(function (exp) {
    const payer = exp.paidBy;
    const amount = exp.amountCents;
    const split = exp.splitBetween;

    // Chi ha pagato ottiene un credito per l'intero importo
    if (balances[payer] !== undefined) {
      balances[payer] += amount;
    }

    if (split.length > 0) {
      // Divisione intera della quota in centesimi
      const baseShare = Math.floor(amount / split.length);
      const remainder = amount % split.length;

      // Assegna la quota a ciascun partecipante e distribuisce i centesimi avanzati
      split.forEach(function (person, index) {
        if (balances[person] !== undefined) {
          const extraCent = index < remainder ? 1 : 0;
          balances[person] -= (baseShare + extraCent);
        }
      });
    }
  });

  return balances;
}

// Risolve i debiti minimizzando il numero di trasferimenti (Greedy Min-Transfer)
function calculateSettlements(balances) {
  const debtors = [];
  const creditors = [];

  // Divide le persone tra chi è a debito e chi è a credito
  Object.keys(balances).forEach(function (name) {
    const bal = balances[name];
    if (bal < 0) {
      debtors.push({ name: name, amount: -bal }); // Importo positivo dovuto
    } else if (bal > 0) {
      creditors.push({ name: name, amount: bal });  // Importo positivo da ricevere
    }
  });

  const settlements = [];

  // Pareggia progressivamente il maggior debitore col maggior creditore
  while (debtors.length > 0 && creditors.length > 0) {
    // Ordina in modo decrescente per importo
    debtors.sort(function (a, b) {
      return b.amount - a.amount;
    });
    creditors.sort(function (a, b) {
      return b.amount - a.amount;
    });

    const maxDebtor = debtors[0];
    const maxCreditor = creditors[0];

    // L'importo del trasferimento è il minore tra debito e credito
    const transferAmount = Math.min(maxDebtor.amount, maxCreditor.amount);

    if (transferAmount > 0) {
      settlements.push({
        from: maxDebtor.name,
        to: maxCreditor.name,
        amountCents: transferAmount
      });
    }

    // Scala gli importi
    maxDebtor.amount -= transferAmount;
    maxCreditor.amount -= transferAmount;

    // Rimuove chi ha pareggiato completamente il proprio conto
    if (maxDebtor.amount === 0) {
      debtors.shift();
    }
    if (maxCreditor.amount === 0) {
      creditors.shift();
    }
  }

  return settlements;
}

// Mostra a video i conti da saldare e il riepilogo in fondo alla card
function renderSettlements() {
  settlementListEl.innerHTML = '';

  // Calcola il totale delle spese per determinare la quota media a testa
  let totalCents = 0;
  expenses.forEach(function (e) {
    totalCents += e.amountCents;
  });

  // Se non ci sono spese registrate
  if (expenses.length === 0) {
    const msg = document.createElement('div');
    msg.className = 'settlement-empty-message';
    msg.textContent = 'Aggiungi una spesa per vedere i conti';
    settlementListEl.appendChild(msg);

    settlementPerPersonEl.textContent = 'Quota a testa: 0,00 €';
    settlementTransfersCountEl.textContent = '· 0 transazioni nette';
    return;
  }

  const balances = calculateBalances();
  const settlements = calculateSettlements(balances);

  // Se tutti i saldi sono in perfetto pareggio (nessun debito)
  if (settlements.length === 0) {
    const msg = document.createElement('div');
    msg.className = 'settlement-empty-message';
    msg.textContent = 'Siete pari! Nessuno deve niente a nessuno.';
    settlementListEl.appendChild(msg);
  } else {
    // Renderizza ogni riga di debito (Sara → Marco 52,50 €)
    settlements.forEach(function (s) {
      const row = document.createElement('div');
      row.className = 'settlement-row';

      const partiesDiv = document.createElement('div');
      partiesDiv.className = 'settlement-parties';

      const fromSpan = document.createElement('span');
      fromSpan.textContent = s.from;

      const arrowIcon = document.createElement('span');
      arrowIcon.className = 'material-symbols-rounded';
      arrowIcon.textContent = 'arrow_forward';

      const toSpan = document.createElement('span');
      toSpan.textContent = s.to;

      partiesDiv.appendChild(fromSpan);
      partiesDiv.appendChild(arrowIcon);
      partiesDiv.appendChild(toSpan);

      const badge = document.createElement('span');
      badge.className = 'settlement-badge-amount';
      badge.textContent = formatCurrency(s.amountCents / 100);

      row.appendChild(partiesDiv);
      row.appendChild(badge);
      settlementListEl.appendChild(row);
    });
  }

  // Quota media calcolata sulle persone presenti
  const avgCents = people.length > 0 ? Math.round(totalCents / people.length) : 0;
  settlementPerPersonEl.textContent = 'Quota a testa: ' + formatCurrency(avgCents / 100);

  const transCount = settlements.length;
  settlementTransfersCountEl.textContent = '· ' + transCount + (transCount === 1 ? ' transazione netta' : ' transazioni nette');
}

/* =========================================================
   /* === AZZERA SPESE === */
/* ========================================================= */

// Azzera l'intera lista delle spese previa conferma utente
function resetExpenses() {
  const confirmed = confirm('Vuoi davvero azzerare tutte le spese registrate?');
  if (confirmed) {
    expenses = [];
    saveExpensesToStorage();
    showExpenseError('');
    renderAll();
  }
}

/* =========================================================
   /* === FUNZIONE DI REFRESH GENERALE === */
/* ========================================================= */

// Ridisegna l'intera interfaccia in maniera coerente
function renderAll() {
  renderPeople();
  renderNewExpenseForm();
  renderExpenses();
  renderSettlements();
}

/* =========================================================
   /* === ASSEGNAZIONE EVENT LISTENER === */
/* ========================================================= */

// Aggiunta persona: clic sul pulsante "+"
addPersonBtn.addEventListener('click', addPerson);

// Aggiunta persona: pressione del tasto "Invio" nel campo di testo
personNameInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addPerson();
  }
});

// Reset messaggio errore persone durante la digitazione
personNameInput.addEventListener('input', function () {
  showPersonMessage('');
});

// Aggiunta spesa: clic sul pulsante primario
addExpenseBtn.addEventListener('click', addExpense);

// Reset errore spesa durante la digitazione
expenseDescInput.addEventListener('input', function () {
  showExpenseError('');
});
expenseAmountInput.addEventListener('input', function () {
  showExpenseError('');
});

// Invio da tastiera nei campi spesa
expenseDescInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    expenseAmountInput.focus();
  }
});
expenseAmountInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addExpense();
  }
});

// Azzera spese
resetExpensesBtn.addEventListener('click', resetExpenses);

// Gestione Modale Info
infoBtn.addEventListener('click', function () {
  infoModal.classList.add('active');
});

closeModalBtn.addEventListener('click', function () {
  infoModal.classList.remove('active');
});

infoModal.addEventListener('click', function (e) {
  if (e.target === infoModal) {
    infoModal.classList.remove('active');
  }
});

// Avvio dell'applicazione al caricamento del DOM
document.addEventListener('DOMContentLoaded', function () {
  initData();
  renderAll();
});

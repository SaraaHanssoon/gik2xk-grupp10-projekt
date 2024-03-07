// Importera nödvändiga moduler
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  storage: config.storage,
});

// Definiera modell för produkter
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Lägg till fler attribut för produkter här
});

// Definiera modell för varukorg
const Cart = sequelize.define('Cart', {
  // Lägg till attribut för varukorg här
});

// Definiera kopplingstabell för att hantera produkter i varukorgen
const CartRow = sequelize.define('CartRow', {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Skapa relationer mellan modellerna
Product.belongsToMany(Cart, { through: CartRow });
Cart.belongsToMany(Product, { through: CartRow });

// Middleware för att hantera JSON-data i request body
app.use(bodyParser.json());

// API-routes för att lägga till en produkt i varukorgen
app.post('/cart/addProduct', async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;

    // Hämta eller skapa en varukorg för användaren
    const [cart, created] = await Cart.findOrCreate({
      where: { userId },
    });

    // Lägg till produkten i varukorgen eller uppdatera antalet
    await cart.addProduct(productId, { through: { amount } });

    res.json({ message: 'Produkt tillagd i varukorgen' });
  } catch (error) {
    console.error('Fel vid hantering av varukorg:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Hämta alla produkter
app.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Fel vid hämtning av produkter:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Hämta en produkt med ett specifikt id
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produkt inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid hämtning av produkt:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Skapa en ny produkt
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Fel vid skapande av produkt:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Uppdatera en produkt med ett specifikt id
app.put('/products/:id', async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Produkt inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid uppdatering av produkt:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Ta bort en produkt med ett specifikt id
app.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Produkt borttagen");
    } else {
      res.status(404).json({ error: 'Produkt inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid borttagning av produkt:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Definiera modell för betyg
const Rating = sequelize.define('Rating', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Skapa relation mellan produkter och betyg
Product.hasMany(Rating);
Rating.belongsTo(Product);

// Ge betyg till en produkt
app.post('/products/:id/addRating', async (req, res) => {
  try {
    const { score } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const rating = await Rating.create({ score, productId: req.params.id });
      res.status(201).json(rating);
    } else {
      res.status(404).json({ error: 'Produkt inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid skapande av betyg:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Definiera modell för användare
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Skapa relation mellan varukorg och användare
Cart.belongsTo(User);
User.hasMany(Cart);

// Hämta alla produkter som en användare lagt i sin senaste varukorg
app.get('/users/:id/getCart', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const cart = await Cart.findOne({
        where: { userId: req.params.id },
        order: [['createdAt', 'DESC']],
        include: Product,
      });
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid hämtning av varukorg:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Hämta alla användare
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Fel vid hämtning av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Skapa en ny användare
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Fel vid skapande av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Uppdatera en användare med ett specifikt id
app.put('/users/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid uppdatering av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});

// Ta bort en användare med ett specifikt id
app.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("Användare borttagen");
    } else {
      res.status(404).json({ error: 'Användare inte hittad' });
    }
  } catch (error) {
    console.error('Fel vid borttagning av användare:', error);
    res.status(500).json({ error: 'Något gick fel' });
  }
});


# Guide d'intégration Stripe pour Documenso

Ce guide s'adresse aux administrateurs et installateurs de l'instance Documenso afin de configurer la facturation et les abonnements avec Stripe.

## 1. Activer la Facturation dans Documenso

Avant toute chose, vous devez activer les fonctionnalités de facturation dans votre configuration d'environnement.

Ouvrez votre fichier `.env.local` (ou la configuration d'environnement de votre hébergeur) et ajoutez/modifiez cette ligne :

```env
NEXT_PUBLIC_FEATURE_BILLING_ENABLED="true"
```

Si cette valeur n'est pas sur `"true"`, toutes les requêtes liées à Stripe (y compris le webhook) seront rejetées.

## 2. Configuration des Clés d'API Stripe

Dans le tableau de bord Stripe, récupérez vos clés d'API (en mode test ou production, selon votre environnement) et ajoutez la clé secrète à votre configuration :

```env
NEXT_PRIVATE_STRIPE_API_KEY="sk_test_..." # ou sk_live_...
```

## 3. Création des Produits et Prix sur Stripe

Pour que Documenso puisse attribuer les bons avantages (limites de documents, utilisateurs, etc.) lorsqu'un utilisateur s'abonne, vous devez créer vos produits dans Stripe et **les lier aux plans de Documenso via des métadonnées (Metadata)**.

### a. Créer un produit
1. Allez dans **Stripe Dashboard > Catalogue de produits**.
2. Cliquez sur **Ajouter un produit**.
3. Renseignez le nom, la description, etc.

### b. Ajouter la métadonnée essentielle (`claimId`)
C'est l'étape la plus importante. Documenso utilise la métadonnée `claimId` pour savoir quel plan attribuer.

- Dans la création de votre Produit (ou de votre Tarif/Prix), descendez jusqu'à la section **Métadonnées (Metadata)**.
- Ajoutez la clé suivante :
  - **Clé** : `claimId`
  - **Valeur** : *(choisissez l'une des valeurs ci-dessous)*

Valeurs possibles pour `claimId` dans Documenso :
- `free` (Gratuit)
- `individual` (Individuel / Pro)
- `team` (Équipes)
- `platform` (Plateforme)
- `enterprise` (Entreprise)
- `earlyAdopter` (Adopteur précoce)

*Note Technique : Le webhook de Documenso cherche d'abord le `claimId` dans les métadonnées du **Prix** (Price). S'il ne le trouve pas, il va chercher dans les métadonnées du **Produit** (Product).*

### c. Créer les prix
Ajoutez les tarifs associés à votre produit (récurrent mensuel, annuel, etc.).

## 4. Configuration du Webhook Stripe

Pour que Documenso soit informé des nouveaux abonnements, paiements ou annulations, vous devez configurer un Webhook.

1. Allez dans **Stripe Dashboard > Développeurs > Webhooks**.
2. Cliquez sur **Ajouter un endpoint**.
3. **URL de l'endpoint** : `https://<votre-domaine-documenso.com>/api/stripe/webhook`
4. **Événements à écouter** (Très important) :
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Cliquez sur **Ajouter l'endpoint**.

## 5. Secret du Webhook

Une fois le webhook créé, Stripe vous donnera un "Secret de signature" (Signing secret) qui commence par `whsec_...`.
Copiez cette valeur et ajoutez-la à votre configuration `.env.local` :

```env
NEXT_PRIVATE_STRIPE_WEBHOOK_SECRET="whsec_..."
```

*(Redémarrez ensuite votre serveur Documenso pour qu'il prenne en compte les nouvelles variables d'environnement).*

## 6. Développement et Tests Locaux

Si vous êtes en environnement de développement local, vous pouvez utiliser la CLI Stripe pour simuler le webhook sans avoir besoin d'une URL publique.

1. Installez la [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Connectez-vous : `stripe login`
3. Lancez le script prévu par Documenso :
   ```bash
   npm run dev:billing
   # ou via bash : bash apps/remix/.bin/stripe-dev.sh
   ```
   Ce script va automatiquement écouter les événements Stripe et les rediriger vers `http://localhost:3000/api/stripe/webhook`.
4. La CLI affichera un secret de webhook (`whsec_...`). Assurez-vous de le mettre dans votre `.env.local` local.

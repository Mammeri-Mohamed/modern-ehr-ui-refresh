import axios from 'axios';

const API_CONFIG = {
  BASE_URL: 'http://192.168.56.101:4000',
  CHANNEL: 'mychannel',
  CHAINCODE_HEALTH_AUTHORITY: 'healthauthority',
  HEALTH_AUTHORITY: { username: "healthAuthUser1", orgName: "Org1" }
};

export const getAdminToken = async () => {
  try {
    console.log("🔹 Connexion de l'admin en cours...");
    const authLoginResponse = await axios.post(`${API_CONFIG.BASE_URL}/users/login`, {
      username: "admin",
      orgName: "Org1"
    });

    if (!authLoginResponse.data.success || !authLoginResponse.data.message?.token) {
      throw new Error("Échec de la connexion à l'admin");
    }

    console.log("✅ Connexion réussie, token JWT récupéré");
    return authLoginResponse.data.message.token;
  } catch (error: any) {
    console.error("❌ Erreur lors de la connexion de l'admin:", error.response?.data || error.message);
    return null;
  }
};

export const updatePatientRequestStatus = async (requestId: string, isAccepted: boolean, token: string) => {
  try {
    console.log(`🔹 Mise à jour du statut de la demande de patient ${requestId}...`);

    await axios.post(
      `${API_CONFIG.BASE_URL}/channels/${API_CONFIG.CHANNEL}/chaincodes/${API_CONFIG.CHAINCODE_HEALTH_AUTHORITY}`,
      {
        fcn: "UpdatePatientRequestStatus",
        args: [API_CONFIG.HEALTH_AUTHORITY.username, requestId, isAccepted.toString()],
        peers: ["peer0.org1.example.com"]
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (isAccepted) {
      await addPatientFromRequest(requestId, token);
    }

    return true;
  } catch (error: any) {
    console.error("❌ Erreur lors de la mise à jour du statut:", error.response?.data || error.message);
    throw error;
  }
};

const addPatientFromRequest = async (requestId: string, token: string) => {
  try {
    console.log(`🔹 Ajout du patient dans la blockchain...`);

    await axios.post(
      `${API_CONFIG.BASE_URL}/channels/${API_CONFIG.CHANNEL}/chaincodes/${API_CONFIG.CHAINCODE_HEALTH_AUTHORITY}`,
      {
        fcn: "AddPatientFromApprovedRequest",
        args: [API_CONFIG.HEALTH_AUTHORITY.username, requestId],
        peers: ["peer0.org1.example.com"]
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error: any) {
    console.error("❌ Erreur lors de l'ajout du patient:", error.response?.data || error.message);
    throw error;
  }
};

export const updateHealthActorRequestStatus = async (requestId: string, isAccepted: boolean, token: string) => {
  try {
    console.log(`🔹 Mise à jour du statut de la demande d'acteur de santé ${requestId}...`);

    await axios.post(
      `${API_CONFIG.BASE_URL}/channels/${API_CONFIG.CHANNEL}/chaincodes/${API_CONFIG.CHAINCODE_HEALTH_AUTHORITY}`,
      {
        fcn: "UpdateHealthActorRequestStatus",
        args: [API_CONFIG.HEALTH_AUTHORITY.username, requestId, isAccepted.toString()],
        peers: ["peer0.org1.example.com"]
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (isAccepted) {
      await addHealthActorFromRequest(requestId, token);
    }

    return true;
  } catch (error: any) {
    console.error("❌ Erreur lors de la mise à jour du statut:", error.response?.data || error.message);
    throw error;
  }
};

const addHealthActorFromRequest = async (requestId: string, token: string) => {
  try {
    console.log(`🔹 Ajout de l'acteur de santé dans la blockchain...`);

    await axios.post(
      `${API_CONFIG.BASE_URL}/channels/${API_CONFIG.CHANNEL}/chaincodes/${API_CONFIG.CHAINCODE_HEALTH_AUTHORITY}`,
      {
        fcn: "AddHealthActorFromApprovedRequest",
        args: [API_CONFIG.HEALTH_AUTHORITY.username, requestId],
        peers: ["peer0.org1.example.com"]
      },
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error: any) {
    console.error("❌ Erreur lors de l'ajout de l'acteur de santé:", error.response?.data || error.message);
    throw error;
  }
};

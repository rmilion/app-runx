import { supabase } from './supabase';

// Função para criar perfil do usuário após cadastro
export async function createUserProfile(userId: string, email: string) {
  const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
  
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        email,
        username,
        level: 1,
        xp: 0,
        total_distance: 0,
        total_time: 0,
        territories_count: 0,
        is_pro: false,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar perfil:', error);
    return null;
  }

  return data;
}

// Função para buscar perfil do usuário
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Erro ao buscar perfil:', error);
    return null;
  }

  return data;
}

// Função para atualizar perfil do usuário
export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar perfil:', error);
    return null;
  }

  return data;
}

// Função para salvar corrida
export async function saveRun(runData: any) {
  const { data, error } = await supabase
    .from('runs')
    .insert([runData])
    .select()
    .single();

  if (error) {
    console.error('Erro ao salvar corrida:', error);
    return null;
  }

  return data;
}

// Função para buscar corridas do usuário
export async function getUserRuns(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('runs')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar corridas:', error);
    return [];
  }

  return data;
}

// Função para buscar territórios do usuário
export async function getUserTerritories(userId: string) {
  const { data, error } = await supabase
    .from('territories')
    .select('*')
    .eq('user_id', userId)
    .order('conquered_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar territórios:', error);
    return [];
  }

  return data;
}

// Função para conquistar território
export async function conquerTerritory(territoryData: any) {
  const { data, error } = await supabase
    .from('territories')
    .insert([territoryData])
    .select()
    .single();

  if (error) {
    console.error('Erro ao conquistar território:', error);
    return null;
  }

  return data;
}

// Função para buscar missões ativas
export async function getActiveMissions() {
  const { data, error } = await supabase
    .from('missions')
    .select('*')
    .or('expires_at.is.null,expires_at.gt.now()')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar missões:', error);
    return [];
  }

  return data;
}

// Função para buscar progresso de missões do usuário
export async function getUserMissions(userId: string) {
  const { data, error } = await supabase
    .from('user_missions')
    .select(`
      *,
      missions (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar progresso de missões:', error);
    return [];
  }

  return data;
}

// Função para atualizar progresso de missão
export async function updateMissionProgress(userId: string, missionId: string, progress: number) {
  const { data, error } = await supabase
    .from('user_missions')
    .upsert({
      user_id: userId,
      mission_id: missionId,
      progress,
      completed: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar progresso de missão:', error);
    return null;
  }

  return data;
}

// Função para completar missão
export async function completeMission(userId: string, missionId: string) {
  const { data, error } = await supabase
    .from('user_missions')
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('mission_id', missionId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao completar missão:', error);
    return null;
  }

  return data;
}

// Função para buscar notificações do usuário
export async function getUserNotifications(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar notificações:', error);
    return [];
  }

  return data;
}

// Função para criar notificação
export async function createNotification(notificationData: any) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notificationData])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar notificação:', error);
    return null;
  }

  return data;
}

// Função para marcar notificação como lida
export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    return null;
  }

  return data;
}

// Função para buscar ranking global
export async function getGlobalLeaderboard(limit = 10) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('xp', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar ranking:', error);
    return [];
  }

  return data;
}

// Função para verificar se usuário precisa assinar plano Pro
export async function checkProSubscription(userId: string) {
  const profile = await getUserProfile(userId);
  
  if (!profile) return { needsUpgrade: false, totalDistance: 0 };

  const needsUpgrade = profile.total_distance >= 10 && !profile.is_pro;
  
  return {
    needsUpgrade,
    totalDistance: profile.total_distance,
    isPro: profile.is_pro,
  };
}

// Função para ativar plano Pro
export async function activateProPlan(userId: string) {
  const subscriptionEnd = new Date();
  subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);

  const { data, error } = await supabase
    .from('profiles')
    .update({
      is_pro: true,
      subscription_end: subscriptionEnd.toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Erro ao ativar plano Pro:', error);
    return null;
  }

  return data;
}

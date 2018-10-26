using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace asp_back.Models{

    public class IUserRepository
    {
         private static ICollection<User> _connectedUsers;
        private static ICollection<User> _waitingList;        
        private static IUserRepository _instance = null;
        private static readonly int max_random = 3;
        public static IUserRepository GetInstance()
        {
            if (_instance == null)
            {
                _instance = new IUserRepository();
            }
            return _instance;
        }

        #region Private methods

        private IUserRepository()
        {
            _connectedUsers = new List<User>();
            _waitingList = new List<User>();
        }

        #endregion

        #region Repository methods

        public IQueryable<User> ConnectedUsers { get { return _connectedUsers.AsQueryable(); } }

        public void AddUser(User user)
        {
            _connectedUsers.Add(user);
        }

        public void RemoveUser(User user)
        {
            _connectedUsers.Remove(user);
        }

        public IQueryable<User> WaitingList { get { return _waitingList.AsQueryable(); } }

        public void AddToWaitingList(User user)
        {
            _waitingList.Add(user);
        }

        public void RemoveFromWaitingList(User user)
        {
            _waitingList.Remove(user);
        }
        #endregion
    }
}
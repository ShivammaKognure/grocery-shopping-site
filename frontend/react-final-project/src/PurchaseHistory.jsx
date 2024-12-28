import { useSelector } from "react-redux";

function PurchaseHistory(){
  const purchaseHistory = useSelector(state => state.purchaseHistory);


  return(
    <>
    <div className="container mt-4 col-md-6">
    <h2 className="mb-4">Purchase History Page</h2>
    
    {purchaseHistory.length === 0 ? (<p>No purchase history</p>):
    (
      <>
      <div className="cart-content">
          <ul className="list-group">
            {purchaseHistory.map((purchase, index) => (
              <li key={index} className="list-group-item mb-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Date:</strong>
                  <span>{purchase.date}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>Total Amount:</strong>
                  <span>${purchase.totalAmount.toFixed(2)}</span>
                </div>
                <div className="mt-3">
                  <h5>Items:</h5>
                  <ul className="list-unstyled ms-3">
                    {purchase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="mb-2">
                        <div className="d-flex justify-content-between">
                          <span>
                            <strong>{item.name}</strong> (${item.price})
                          </span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
        </>
       )}
      </div>
    </>
  )
}
export default PurchaseHistory;
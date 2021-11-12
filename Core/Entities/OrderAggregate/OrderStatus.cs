using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Order made, we will contact you")]
        Pending,

        [EnumMember(Value = "Payment Received")]
        PaymentRecevied,

        [EnumMember(Value = "Payment Failed")]
        PaymentFailed
    }
}